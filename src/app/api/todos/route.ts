import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? 10)
  const skip = Number(searchParams.get('skip') ?? 0)
  if (isNaN(take)) {
    return NextResponse.json(
      { message: 'Invalid take parameter' },
      { status: 400 }
    )
  }
  if (isNaN(skip)) {
    return NextResponse.json(
      { message: 'Invalid skip parameter' },
      { status: 400 }
    )
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
    orderBy: {
      createdAt: 'desc',
    },
  })
  return NextResponse.json(todos, { status: 200 })
}

const postSchema = yup.object().shape({
  title: yup.string().required(),
  completed: yup.boolean().optional().default(false),
})

export async function POST(request: Request) {
  try {
    const { title, completed } = await postSchema.validate(await request.json())
    const todo = await prisma.todo.create({
      data: {
        title,
        completed,
      },
    })
    return NextResponse.json(todo, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 })
  }
}
