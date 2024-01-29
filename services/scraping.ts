"use server";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { parseHTML } from "linkedom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getHTMLCalender = async(year: string) => {
    const resp = await fetch(`https://www.liburnasional.com/kalender-lengkap-${year}/`);
    if(!resp.ok) {
        throw new Error(`An error has occured: ${resp.status}`);
    }
    const text = await resp.text();
    return text
}

function convertStringToDate(dateString: string) {
  const monthMap: any = {
    Januari: "01",
    Februari: "02",
    Maret: "03",
    April: "04",
    Mei: "05",
    Juni: "06",
    Juli: "07",
    Agustus: "08",
    September: "09",
    Oktober: "10",
    November: "11",
    Desember: "12",
  };
  const parts = dateString.split("/");
  const month = monthMap[parts[0]];
  const formattedDate = `${month}/${parts[1]}/${parts[2]}`;
  const dateObject = new Date(formattedDate).toString();
  return dateObject;
}

export async function getDaftarLiburNasional(year: string) {
  try {
    let result: any = [];

    // const filePath = path.join(__dirname, ".." ,"public", "data.txt");
    // const data = await fs.readFile(filePath, "utf8");
    
    const element = await getHTMLCalender(year)
    const { document } = parseHTML(element);
    let div = document.querySelectorAll(".libnas-calendar-full-detail");
    const td = Array.from(div).map((item) => item.querySelectorAll("td"));
    for (const item of td) {
      item.forEach((item) => {
        if (item.textContent?.split(":").join("").trim() != "") {
          result.push(item.textContent);
        }
      });
    }

    let outputArray: any = [];

    for (let i = 0; i < result.length; i += 2) {
      let datePart = result[i];
      let eventPart = result[i + 1];
      let part = datePart.split(" - ");
      if (part.length > 1) {
        let hasil = part.map((item: any) => {
          if (item.includes(" ")) {
            let [tanggal, bulan] = item.split(" ");

            return `${tanggal} ${bulan}`;
          } else {
            return `${item} ${part[1].split(" ")[1]}`;
          }
        });
        for (let i = 0; i < hasil.length; i++) {
          outputArray.push({
            date: convertStringToDate(new Date(`${hasil[i].split(" ").join("/")}/${year}`).toString()),
            name: eventPart,
          });
        }
      } else {
        outputArray.push({
          date: convertStringToDate(
            `${datePart.split(" ").reverse().join("/")}/${year}`
          ).toString(),
          name: eventPart,
        });
      }
    }

    const outputFile = path.join(__dirname, "..", "data", `${year}.json`)
    // @ts-ignore
    fs.writeFile(outputFile, JSON.stringify(outputArray), (error) => {
        if (error) {
            console.log(error);
        }
        console.log(`Berhasil menyimpan data daftar hari libur di tahun ${year}`);
    });
  } catch (e) {
    console.log(e);
  }
}