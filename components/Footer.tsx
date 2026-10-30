export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center font-body text-sm text-arena-chalk-dim">
        <p>Turf Cricket Manager — built by Webtrendz Technologies</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-arena-chalk">
            GitHub
          </a>
          <a href="#" className="hover:text-arena-chalk">
            Documentation
          </a>
          <a href="#" className="hover:text-arena-chalk">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
