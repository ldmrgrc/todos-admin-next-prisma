import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
  await prisma.todo.deleteMany()

  await prisma.todo.createMany({
    data: [
      {
        title: 'Learn how to use Next.js',
        completed: true,
      },
      {
        title: 'Learn how to use Prisma',
      },
      {
        title: 'Learn how to use Vercel',
      },
      {
        title: 'Learn how to use TypeScript',
      },
      {
        title: 'Learn how to use Tailwind CSS',
      },
      {
        title: 'Learn how to use React',
      },
      {
        title: 'Learn how to use NextAuth.js',
      },
    ],
  })

  return NextResponse.json(
    {
      message: 'Seed data has been created!',
    },
    { status: 201 }
  )
}
