import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

interface Segments {
  params: {
    id: string
  }
}

const getTodo = async (id: string) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  })
  return todo
}

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id)
  if (!todo) {
    return NextResponse.json(
      { message: `Todo ${params.id} not found` },
      { status: 404 }
    )
  }
  return NextResponse.json(todo, { status: 200 })
}

const putSchema = yup.object().shape({
  title: yup.string().optional(),
  completed: yup.boolean().optional(),
})

export async function PUT(request: NextRequest, { params }: Segments) {
  const todo = await getTodo(params.id)
  if (!todo) {
    return NextResponse.json(
      { message: `Todo ${params.id} not found` },
      { status: 404 }
    )
  }
  try {
    const { completed, title } = await putSchema.validate(await request.json())
    const updatedTodo = await prisma.todo.update({
      where: {
        id: params.id,
      },
      data: {
        completed,
        title,
      },
    })
    return NextResponse.json(updatedTodo, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
