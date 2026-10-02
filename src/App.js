import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [urls, setUrls] = useState([]);
  const [message, setMessage] = useState("");

  const normalizeUrl = (url) => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      return "";
    }

    if (!/^https?:\/\//i.test(trimmedUrl)) {
      return `https://${trimmedUrl}`;
    }

    return trimmedUrl;
  };

  const parseUrls = () => {
    const lines = input
      .split("\n")
      .map(normalizeUrl)
      .filter(Boolean);

    const uniqueUrls = [...new Set(lines)];

    const duplicateCount = lines.length - uniqueUrls.length;

    setUrls(uniqueUrls);

    setMessage(
      `Total URLs: ${lines.length} | Unique URLs: ${uniqueUrls.length} | Duplicate URLs: ${duplicateCount}`
    );
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validUrls = useMemo(
    () => urls.filter(validateUrl),
    [urls]
  );

  const openAllUrls = () => {
    if (validUrls.length === 0) {
      setMessage("Please enter valid URLs first.");
      return;
    }

    validUrls.forEach((url) => {
      window.open(url, "_blank", "noopener,noreferrer");
    });

    setMessage(
      `${validUrls.length} URL${validUrls.length !== 1 ? "s" : ""} opened.`
    );
  };

  const removeDuplicates = () => {
    const lines = input
      .split("\n")
      .map(normalizeUrl)
      .filter(Boolean);

    const uniqueUrls = [...new Set(lines)];

    const duplicateCount = lines.length - uniqueUrls.length;

    setInput(uniqueUrls.join("\n"));
    setUrls(uniqueUrls);

    setMessage(
      `Total URLs: ${lines.length} | Unique URLs: ${uniqueUrls.length} | Duplicate URLs removed: ${duplicateCount}`
    );
  };

  const clearAll = () => {
    setInput("");
    setUrls([]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <a
            href="/"
            className="text-2xl font-bold text-slate-900"
          >
            Multiple URL Opener
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-16">

        {/* Hero */}
        <section className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free Online URL Tool
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Multiple URL Opener
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Open multiple URLs at once with our free online multiple URL
            opener. Paste your website links, validate URLs, remove
            duplicates, and open multiple websites in separate browser tabs.
          </p>
        </section>

        {/* URL Opener Tool */}
        <section
          aria-label="Multiple URL Opener Tool"
          className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-6 shadow-lg"
        >
          <label
            htmlFor="url-input"
            className="mb-3 block text-sm font-semibold"
          >
            Enter URLs
          </label>

          <textarea
            id="url-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`https://google.com
https://github.com
https://stackoverflow.com`}
            aria-label="Enter multiple URLs"
            className="min-h-[220px] w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-3">

            <button
              onClick={parseUrls}
              type="button"
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Validate URLs
            </button>

            <button
              onClick={removeDuplicates}
              type="button"
              className="rounded-lg border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100"
            >
              Remove Duplicates
            </button>

            <button
              onClick={openAllUrls}
              type="button"
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Open All URLs
            </button>

            <button
              onClick={clearAll}
              type="button"
              className="rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              Clear
            </button>

          </div>

          {/* Message */}
          {message && (
            <p
              role="status"
              className="mt-5 rounded-lg bg-slate-100 p-3 text-sm"
            >
              {message}
            </p>
          )}
        </section>

      {/* URL List */}
      {urls.length > 0 && (
      <section className="mx-auto mt-8 max-w-3xl rounded-2xl bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">
            URL Results
          </h2>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
            {urls.length} URLs
          </span>
        </div>

        <div className="space-y-2">
          {urls.map((url, index) => {
            const isValid = validateUrl(url);

            return (
              <div
                key={`${url}-${index}`}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                {/* URL */}
                <span className="min-w-0 flex-1 truncate text-sm">
                  {url}
                </span>

                {/* Status */}
                <span
                  className={
                    isValid
                      ? "shrink-0 text-sm font-semibold text-green-600"
                      : "shrink-0 text-sm font-semibold text-red-600"
                  }
                >
                  {isValid ? "Valid" : "Invalid"}
                </span>

                {/* Open button */}
                {isValid && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    Open ↗
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>
    )}

        {/* SEO Content */}
        <section className="mx-auto mt-16 max-w-3xl">

          <h2 className="text-2xl font-bold">
            What Is a Multiple URL Opener?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            A multiple URL opener is a free online tool that lets you open
            multiple website URLs at once. Instead of opening each link
            individually, you can paste a list of URLs and open them in
            separate browser tabs.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Open Multiple URLs at Once
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            If you regularly work with several websites, opening each URL
            manually can take unnecessary time. This bulk URL opener provides
            a simple way to organize your links and open multiple websites
            from one place.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            How to Use the Multiple URL Opener
          </h2>

          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-slate-600">
            <li>Copy the website URLs you want to open.</li>
            <li>Paste one URL per line into the URL opener.</li>
            <li>Click "Validate URLs" to check the URL format.</li>
            <li>Remove duplicate URLs if necessary.</li>
            <li>Click "Open All URLs" to open valid links in separate tabs.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold">
            Who Can Use a Multiple URL Opener?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            This online URL opener can be useful for developers, web
            publishers, SEO professionals, researchers, marketers, students,
            testers, and anyone who regularly works with multiple website
            links.
          </p>

          <h2 className="mt-10 text-2xl font-bold">
            Features of Our URL Opener
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-600">
            <li>Open multiple URLs in separate browser tabs.</li>
            <li>Validate URL format before opening links.</li>
            <li>Remove duplicate URLs.</li>
            <li>See the number of total and unique URLs.</li>
            <li>Simple and easy-to-use interface.</li>
            <li>No software installation required.</li>
            <li>Works directly in your web browser.</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">
            Bulk URL Opener for Daily Work
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            A bulk URL opener can help save time when you need to access
            several websites during research, website testing, SEO work,
            content publishing, development, or other daily online tasks.
          </p>

        </section>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-3xl">

          <h2 className="text-2xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-6">

            <div>
              <h3 className="text-lg font-semibold">
                What is a multiple URL opener?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                A multiple URL opener is an online utility that lets you
                enter several URLs and open them quickly in separate
                browser tabs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Can I open multiple URLs at once?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Yes. Enter multiple URLs into the tool and click
                "Open All URLs" to attempt to launch the valid URLs
                in separate browser tabs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Is the Multiple URL Opener free?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Yes. The Multiple URL Opener is available as a free
                online utility.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                How many URLs can I open at once?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                You can enter multiple URLs into the tool. For better
                browser performance, it is recommended to process very
                large lists in manageable batches.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Can I remove duplicate URLs?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Yes. Click "Remove Duplicates" to remove repeated URLs
                from your list before opening them.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Does the tool validate URLs?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                Yes. The tool checks whether a URL has a valid URL format.
                This does not guarantee that the website is online or that
                the URL does not redirect or return a 404 page.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Do I need to install software?
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                No. The Multiple URL Opener works directly in your web
                browser and does not require software installation.
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="text-center">

            <h2 className="font-semibold text-slate-900">
              Multiple URL Opener
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              A simple online tool for opening and managing multiple URLs.
            </p>

            <p className="mt-4 text-sm text-slate-400">
              © {new Date().getFullYear()} Multiple URL Opener. All rights
              reserved.
            </p>

          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;