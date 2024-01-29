import { NextRequest } from "next/server";
import fsPromises from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const month = searchParams.get('month')
  const year = searchParams.get('year')
  try {
    let result = [];
    let year: any = new Date().getFullYear();
    let text = await fsPromises.readFile(
      path.join(process.cwd(),"data", `${year}.json`),
      "utf8"
    );
    if (searchParams.has("year")) {
      year = searchParams.get("year");
      text = await fsPromises.readFile(
        path.join(process.cwd(),"data", `${year}.json`),
        "utf8"
      );
    }
    let parseResult = JSON.parse(text);
    if(searchParams.has("month") && year) {
      result = parseResult.filter((item: any) => {
        if(new Date(item.date).getMonth() + 1 == Number(month)) {
          return item
        }
      })
    } else if(year) {
      result = parseResult;
    }
    return Response.json({
      message: "Fetching success",
      statusCode: 200,
      data: result
    }, {
      statusText: "OK",
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate",
      },
    });
  } catch (err: any) {
    return Response.json({
      "message": `Tidak ada tahun ${year}`,
      "statusCode": 500,
      "error": err
    }, {
      statusText: "ERROR",
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate",
      },
    });
  }
}
