import axios from "axios";

export default class Convertor {
    constructor (convert) {
        this.valuteFrom = convert.valuteFrom;
        this.valuteTo = convert.valuteTo;

        this.date = convert.date;
        this.count = convert.count;
    }

    async convertValute () {
        const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${this.valuteFrom}/${this.valuteTo}.json`;
        const converted = await axios.get(url);

        return converted.data[this.valuteTo];
    }
}