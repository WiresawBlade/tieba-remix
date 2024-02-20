import { TiebaComponent } from "../api/abstract";
import { DOMS } from "../elemental";

export type PagerType = "prev" | "next" | "head" | "tail" | "page";

export class Pager extends TiebaComponent<"li"> {
    public allPagerButtons(): Array<HTMLAnchorElement | HTMLSpanElement> {
        return DOMS("a, .tP", this.get());
    }

    public getPagerButton(pagerType: PagerType, index = 0) {
        const allButtons = this.allPagerButtons();

        switch (pagerType) {
            case "prev": {
                return this.findMatchingButton(allButtons, "上一页");
            }

            case "next": {
                return this.findMatchingButton(allButtons, "下一页", true);
            }

            case "head": {
                return this.findMatchingButton(allButtons, "首页");
            }

            case "tail": {
                return this.findMatchingButton(allButtons, "尾页", true);
            }

            case "page": {
                let count = 0;
                for (const el of allButtons) {
                    if (/^\d+$/.test(el.innerText)) {
                        if (count === index && el instanceof HTMLAnchorElement) {
                            return el;
                        }
                        count++;
                    }
                }
                return null; // 没有找到对应索引的按钮
            }

            default:
                return null; // 未知的 pagerType
        }
    }

    public getByPage(page: number) {
        return this.findMatchingButton(this.allPagerButtons(), page.toString());
    }

    public jumpTo(page: number) {
        const jumperBox = DOMS(true, "#jumpPage4, #jumpPage6", "input");
        const jumperButton = DOMS(true, "#pager_go4, #pager_go6", "button");
        jumperBox.value = page.toString();
        jumperButton.click();
    }

    private findMatchingButton(buttons: HTMLElement[], text: string, reverse = false) {
        const iterator = reverse ? Array.from(buttons).reverse() : buttons;
        for (const el of iterator) {
            if (el.innerText === text) {
                return el as HTMLAnchorElement;
            }
        }
        return null;
    }
}

export const pager = new Pager(".l_pager", "li");
