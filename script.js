const input = document.getElementById("input");
const output = document.getElementById("output");
const btn = document.getElementById("rewrite");

const phraseMap = [
  ["it is important to note that", "one thing to keep in mind is that"],
  ["in conclusion", "overall"],
  ["in addition", "on top of that"],
  ["however", "that said"],
  ["therefore", "as a result"],
  ["utilize", "use"],
  ["approximately", "roughly"],
  ["due to the fact that", "because"]
];

function rewriteText(text) {
  let result = text.toLowerCase();

  // Replace common rigid phrases
  phraseMap.forEach(([from, to]) => {
    const regex = new RegExp(`\\b${from}\\b`, "gi");
    result = result.replace(regex, to);
  });

  // Split sentences
  let sentences = result.split(/(?<=[.!?])\s+/);

  // Reorder some sentences slightly
  if (sentences.length > 3) {
    const last = sentences.pop();
    sentences.splice(1, 0, last);
  }

  // Vary sentence openings
  sentences = sentences.map(sentence => {
    if (Math.random() < 0.35) {
      return sentence.replace(
        /^(\w+)/,
        word => word.charAt(0).toUpperCase() + word.slice(1)
      );
    }
    return sentence;
  });

  // Rejoin and clean spacing
  result = sentences.join(" ");
  result = result.replace(/\s+/g, " ").trim();

  // Capitalize properly
  result = result.replace(/(^\w|[.!?]\s+\w)/g, c => c.toUpperCase());

  return result;
}

btn.addEventListener("click", () => {
  output.value = rewriteText(input.value);
});
