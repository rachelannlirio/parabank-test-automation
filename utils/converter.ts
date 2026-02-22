export function convertToNumber(dollarAmountInString: string): number {
  return parseFloat(dollarAmountInString.replace(/[$,]/g, ''))
}
