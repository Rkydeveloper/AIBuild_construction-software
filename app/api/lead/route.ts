import { NextResponse } from "next/server";

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby-JgBRljj7GTOyQXpmOE-8R1U5qvuYL-teowEyVJCCVWAZq_PlqiGADPizqo-N7Er-Ow/exec";

export async function POST(request: Request) {
  try {
    const leadData = await request.json();

    console.log("[lead] Received:", leadData);

    const googleResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
      redirect: "follow",
      cache: "no-store",
    });

    const responseText = await googleResponse.text();

    console.log("[lead] Google status:", googleResponse.status);
    console.log("[lead] Google response:", responseText);

    if (!googleResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Google Apps Script returned HTTP ${googleResponse.status}.`,
          details: responseText.slice(0, 1000),
        },
        { status: 502 }
      );
    }

    let googleData: {
      status?: string;
      message?: string;
      row?: number;
    };

    try {
      googleData = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Google Apps Script returned a non-JSON response.",
          details: responseText.slice(0, 1000),
        },
        { status: 502 }
      );
    }

    if (googleData.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          error: googleData.message || "Google Apps Script failed to save the lead.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead saved successfully.",
      row: googleData.row,
    });
  } catch (error) {
    console.error("[lead] API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}
