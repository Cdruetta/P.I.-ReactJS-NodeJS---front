import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SalesView = ({ sales }) => {
    const toast = useRef(null);

    const exportSaleToPDF = (sale) => {
        const doc = new jsPDF();

        doc.setFillColor(100, 149, 237); 
        doc.rect(0, 0, 210, 30, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('Ficha de Venta', 105, 20, { align: 'center' });

        try {
            doc.addImage('/logo.png', 'PNG', 160, 1, 28, 28);
        } catch (e) {
            console.warn("No se pudo cargar la imagen.");
        }

        doc.setFontSize(12);
        doc.setTextColor(0);
        autoTable(doc, {
            startY: 40,
            margin: { left: 15, right: 15 },
            head: [['Campo', 'Valor']],
            body: [
                ['Cliente', sale.Usuario?.nombre || 'Sin nombre'],
                ['Producto', sale.Producto?.nombre || 'Sin producto'],
                ['Cantidad', sale.cantidad],
                ['Total', `$${sale.total}`],
                ['Fecha', new Date(sale.fecha).toLocaleDateString()],
            ],
            theme: 'grid',
            styles: { fontStyle: 'normal', halign: 'left' },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
        });

        doc.setFontSize(10);
        doc.text(`Generado por GCsoft - ${new Date().toLocaleDateString()}`, 15, 290);

        doc.save(`venta_${sale.id}.pdf`);

        toast.current?.show({
            severity: 'success',
            summary: 'PDF generado',
            detail: `PDF de venta ${sale.id} generado`,
            life: 3000
        });
    };

    const pdfButtonTemplate = (rowData) => (
        <Button
            icon="pi pi-file-pdf"
            className="p-button-rounded p-button-help p-button-sm"
            onClick={() => exportSaleToPDF(rowData)}
            tooltip="Descargar PDF"
        />
    );

    return (
        <div className="grid p-fluid">
            <Toast ref={toast} />

            <div className="col-12">
                <Card className="shadow-2">
                    <DataTable
                        value={sales}
                        scrollable
                        scrollHeight="flex"
                        emptyMessage="No se encontraron ventas"
                        tableStyle={{ minWidth: '60rem' }}
                    >
                        <Column field="Usuario.nombre" header="Cliente" />
                        <Column field="Producto.nombre" header="Producto" />
                        <Column field="cantidad" header="Cantidad" />
                        <Column field="total" header="Total" />
                        <Column field="fecha" header="Fecha" body={(row) => new Date(row.fecha).toLocaleDateString()} />
                        <Column header="PDF" body={pdfButtonTemplate} style={{ width: '80px' }} />
                    </DataTable>
                </Card>
            </div>
        </div>
    );
};

export default SalesView;
