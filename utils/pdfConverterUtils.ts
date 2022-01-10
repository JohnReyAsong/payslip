import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const convertToPdf = (docName: string) => {
  const input = document.getElementById('divToPrint')
  html2canvas(input as HTMLElement).then((canvas) => {
    const imgData = canvas.toDataURL('image/png')
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF('p', 'px', 'letter')
    pdf.addImage(imgData, 'PNG', 0, 0, 420, 0)
    // pdf.output('dataurlnewwindow');
    pdf.save(`${docName}.pdf`)
  })
}
