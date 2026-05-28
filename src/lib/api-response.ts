import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiError(error: unknown, status = 400) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        message: "Validation error",
        errors: error.flatten(),
      },
      { status }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { message: error.message },
      { status }
    );
  }

  return NextResponse.json(
    { message: "Unknown server error" },
    { status: 500 }
  );
}