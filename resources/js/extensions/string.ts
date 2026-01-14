declare global {
    interface String {
        capitalizeFirstLetter(): string;
        capitalizeEachWord(): string;
    }
}

String.prototype.capitalizeFirstLetter = function (): string {
    if (this.length === 0) {
        // Handle empty strings
        return '';
    }
    const firstLetter = this[0].toUpperCase();
    const restOfString = this.slice(1);
    return firstLetter + restOfString;
};

String.prototype.capitalizeEachWord = function (): string {
    return this.split(' ')
        .map((word) => word.capitalizeFirstLetter())
        .join(' ');
};

export {};
