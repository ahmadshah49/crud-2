import { NextResponse } from "next/server";
import { prisma } from "../config/prisma";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.products.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
      },
    });
    return NextResponse.json({ message: "Product Created" });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({
      message: "Something Went Wronge",
      error: JSON.stringify(error),
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.products.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({ message: "Product Deleted" });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({
      message: "Something Went Wronge",
      error: JSON.stringify(error),
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.products.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
      },
    });
    return NextResponse.json({ message: "Product Updated" });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({
      message: "Something Went Wronge",
      error: JSON.stringify(error),
    });
  }
};
