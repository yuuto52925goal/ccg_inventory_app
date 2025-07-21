export const createFileName = (id: number) => {
    return `invoice_${id}_${Date.now()}.pdf`
}