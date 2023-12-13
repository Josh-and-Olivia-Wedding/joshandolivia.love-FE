import { DotComponent, IDotCss, IDotElement, dot } from "dothtml";

export default class MealItem extends DotComponent{
	builder(...args: any[]): IDotElement {
		return dot.div(

		).class("meal-item")
	}

	style(css: IDotCss): void {
		
	}
}

// "Roasted Butternut Squash Soup"
// "Mushroom Pesto Rigatoni"
// "Veggie Filo Turnover"
// "Vegetable Tika Skewer"
// "Vegan Rice-Stuffed Bell Peppers"
// "Ice Cream Crepe"