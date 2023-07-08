export default function ({ handleSearch }) {
  return (
    <div className="header">
      <h1>😎 EmojiSearch 😎 </h1>
      <input
        type="text"
        placeholder="What emoji are you looking for ?"
        onChange={handleSearch}
      />
    </div>
  );
}
