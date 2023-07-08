export default function ({ emoji }) {
  return (
    <div className="line">
      {emoji.symbol} {emoji.title}
    </div>
  );
}
