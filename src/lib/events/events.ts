export function addClickListener(
  element: HTMLElement,
  handler: (evt: MouseEvent) => void,
): () => void {
  element.addEventListener("click", handler);
  return () => element.removeEventListener("click", handler);
}
