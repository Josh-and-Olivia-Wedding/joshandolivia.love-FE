import { DotComponent, IDotCss, IDotElement, dot } from "dothtml";


export default class DateWidget extends DotComponent{
	builder(): IDotElement {

		return dot.table(
			dot.tr(
				dot
					.td("3:45 PM").class("td1")
					.td("Jan 13").class("td2")
					.td("2024").class("td3")
			)
		);
	}

	style(css: IDotCss){
		css("table")
			.width('auto')
			.marginLeft(0)
			.marginRight(0)
			.borderCollapse('collapse')
			.textAlign('center');

		css("td").padding(16);
		
		css(".td1")
			.fontSize(24)
			.color("#DDD")
			.borderRight("3px solid #EB3")
		css(".td2")
			.fontSize(42)
			.color("#EEE")
			.borderRight("3px solid #EB3")
		css(".td3")
			.fontSize(24)
			.color("#DDD");
	}

}