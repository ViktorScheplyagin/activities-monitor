import { prisma } from "@/shared/api/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
