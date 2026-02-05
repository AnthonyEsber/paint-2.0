export class Navbar {
    private root: HTMLElement;
    constructor(root: HTMLElement) {
        this.root = root;
        this.init();
    }

    init() {
        const buttons = this.root.querySelectorAll<HTMLButtonElement>(
             '[data-tool="rect"] , [data-tool="circle"]'
        );

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                buttons.forEach((b) => b.classList.remove("is-active"));
                btn.classList.add("is-active");
            });
        });
        buttons[0]?.classList.add('is-active');
    }
}