import ButtonToggleMode from "@/components/shared/ButtonToggleMode";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Home() {

  const d = new Date();

  const codeStringSuccess = `
  {
    "message": "Fetching success",
    "statusCode": 200,
    "data": [
      {
        "date": "Wed Dec 25 2024 00:00:00 GMT+0700 (Western Indonesia Time)",
        "name": "Hari Natal"
      }
    ]
  }
  `;
  const codeStringError = `
  }
    "message": "Tidak ada tahun 2025",
    "statusCode": 500
  }
  `;

  return (
    <main className="w-full flex flex-col min-h-svh h-full justify-center md:items-center bg-neutral-50 text-slate-600 dark:bg-gray-800 dark:text-neutral-200">
      <div className="md:max-w-4xl w-full bg-slate-200 dark:bg-slate-600 p-4 rounded-sm shadow-md my-10">
        <div className="flex">
          <h1 className="text-center text-2xl font-semibold mb-5 flex-1">
            API Hari Libur Nasional
          </h1>
          <ButtonToggleMode />
        </div>
        <div className="w-full">
          <h5 className="text-lg mb-2 text-lime-600 dark:text-lime-400">Format Respon Sukses API</h5>
          <SyntaxHighlighter language="json" style={atomOneDark}>
            {codeStringSuccess}
          </SyntaxHighlighter>
        </div>
        <div className="w-full mt-2">
          <h5 className="text-lg mb-2 text-red-600 dark:text-lime-400">Format Respon Error API</h5>
          <SyntaxHighlighter language="json" style={atomOneDark}>
            {codeStringError}
          </SyntaxHighlighter>
        </div>
        <div className="mt-2">
          <h2 className="mb-2 text-lg font-semibold text-red-600">
            Permintaan Wajib:
          </h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>Mendapatkan data hari libur tahun sekarang /api</li>
            <li>Mendapatkan data hari libur pada tahun {d.getFullYear()} /api?year={d.getFullYear()}</li>
            <li>
              Mendapatkan data hari libur di bulan 10 pada tahun saat ini
              /api?month=10
            </li>
            <li>
              Mendapatkan data hari libur di bulan 10 pada tahun {d.getFullYear()}
              /api?month=10&year={d.getFullYear()}
            </li>
          </ul>
        </div>
        <div className="mt-2">
          <h2 className="text-lime-600 dark:text-lime-400">Bagaimana API ini bekerja?</h2>
          <p>
            API ini mengambil data dari <span><a className="text-sky-600 hover:text-sky-400" href="liburnasional.com" title="liburnasional.com">
              liburnasional.com
            </a></span> dengan cara di scraping setiap 1 bulan sekali menggunakan github
            action.
          </p>
        </div>
        <div className="mt-2">
          <h2 className="text-lime-600 dark:text-lime-400">Kontribusi?</h2>
          <p>
            Jika anda ingin berkontribusi di projek ini silahkan kunjungi
            repository saya di <span>
            <a
              className="text-sky-600 hover:text-sky-400"
              href="https://github.com/rhandyta/libur-indonesia-api"
            >
              Github
            </a></span>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
