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
          <h1 className="text-2xl font-bold text-slate-900">
            Multiple URL Opener
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-16">

        {/* Hero */}
        <section className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Free Multiple URL Opener
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Multiple URL Opener
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Open multiple URLs at once with our free online URL opener.
            Paste your website links, validate URLs, remove duplicates,
            and open multiple websites in separate browser tabs.
          </p>
        </section>

        {/* Tool */}
        <section className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-6 shadow-lg">

          <label className="mb-3 block text-sm font-semibold">
            Enter URLs
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`https://google.com
https://github.com
https://stackoverflow.com`}
            className="min-h-[220px] w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-3">

            <button
              onClick={parseUrls}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Validate URLs
            </button>

            <button
              onClick={removeDuplicates}
              className="rounded-lg border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100"
            >
              Remove Duplicates
            </button>

            <button
              onClick={openAllUrls}
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Open All URLs
            </button>

            <button
              onClick={clearAll}
              className="rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              Clear
            </button>

          </div>

          {/* Message */}
          {message && (
            <p className="mt-5 rounded-lg bg-slate-100 p-3 text-sm">
              {message}
            </p>
          )}

        </section>

        {/* URL List */}
        {urls.length > 0 && (
          <section className="mx-auto mt-8 max-w-3xl rounded-2xl bg-white p-6 shadow">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-bold">
                URLs
              </h3>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                {urls.length} URLs
              </span>

            </div>

            <div className="space-y-2">

              {urls.map((url, index) => (

                <div
                  key={`${url}-${index}`}
                  className="flex items-center justify-between rounded-lg border p-3"
                >

                  <span className="max-w-[80%] truncate text-sm">
                    {url}
                  </span>

                  <span
                    className={
                      validateUrl(url)
                        ? "text-sm font-semibold text-green-600"
                        : "text-sm font-semibold text-red-600"
                    }
                  >
                    {validateUrl(url) ? "Valid" : "Invalid"}
                  </span>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* Information */}
        {/* SEO Content */}
      <section className="mx-auto mt-16 max-w-3xl">

        <h2 className="text-2xl font-bold">
          What is a Multiple URL Opener?
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          A Multiple URL Opener is a free online tool that lets you
          open multiple website URLs at once. Instead of opening each
          link individually, you can paste a list of URLs and open
          them in separate browser tabs.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          How to Open Multiple URLs at Once
        </h2>

        <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-slate-600">
          <li>Copy the website URLs you want to open.</li>
          <li>Paste one URL per line into the URL opener.</li>
          <li>Click Validate URLs to check the URL format.</li>
          <li>Remove duplicate URLs if necessary.</li>
          <li>Click Open All URLs to open the links in separate tabs.</li>
        </ol>

        <h2 className="mt-10 text-2xl font-bold">
          Who Can Use a Multiple URL Opener?
        </h2>

        <p className="mt-4 leading-7 text-slate-600">
          This tool can be useful for developers, web publishers,
          SEO professionals, researchers, marketers, students, and
          anyone who regularly works with multiple website links.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Features of Our URL Opener
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-600">
          <li>Open multiple URLs in separate browser tabs.</li>
          <li>Validate URL format before opening links.</li>
          <li>Remove duplicate URLs.</li>
          <li>Simple and easy-to-use interface.</li>
          <li>No software installation required.</li>
          <li>Works directly in your web browser.</li>
        </ul>

      </section>

      {/* FAQ */}
      <section className="mx-auto mt-16 max-w-3xl">

        <h2 className="text-2xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="mt-6 space-y-6">

          <div>
            <h3 className="text-lg font-semibold">
              How many URLs can I open at once?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              You can enter multiple URLs into the tool. For the best
              browser performance, it is recommended to process URLs
              in manageable batches.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Can I open multiple URLs in different tabs?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Yes. The tool attempts to open each valid URL in a
              separate browser tab. Your browser's popup settings may
              limit how many tabs can be opened automatically.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Do I need to install any software?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              No. The Multiple URL Opener works directly in your
              web browser and does not require software installation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Can I remove duplicate URLs?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Yes. Use the Remove Duplicates option to remove repeated
              URLs before opening them.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Does the tool validate URLs?
            </h3>

            <p className="mt-2 leading-7 text-slate-600">
              Yes. The tool checks whether the URLs have a valid URL
              format. Website availability, redirects, and 404 errors
              can be checked separately using server-side validation.
            </p>
          </div>

        </div>

      </section>

      </main>

    <footer className="mt-16 border-t bg-white">

      <div className="mx-auto max-w-6xl px-6 py-8">

        <div className="text-center">

          <h2 className="font-semibold text-slate-900">
            URL Tools
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Simple online tools for working with URLs and websites.
          </p>

          <p className="mt-4 text-sm text-slate-400">
            © {new Date().getFullYear()} URL Tools. All rights reserved.
          </p>

        </div>

      </div>

    </footer>

    </div>
  );
}

export default App;