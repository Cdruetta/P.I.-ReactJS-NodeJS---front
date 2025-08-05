import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ProductsView = ({ 
  products, 
  onDelete, 
  onEdit 
}) => {
  const toast = useRef(null);

  const confirmDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      onDelete(id);
      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto eliminado',
        life: 3000
      });
    }
  };

  const exportProductToPDF = (product) => {
    const doc = new jsPDF();

    doc.setFillColor(100, 149, 237); 
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Ficha de Producto', 105, 20, { align: 'center' });

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
        ['Nombre', product.nombre],
        ['Categoría', product.categoria],
        ['Precio', `$${product.precio}`],
      ],
      theme: 'grid',
      styles: { fontStyle: 'normal', halign: 'left' },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
    });

    doc.setFontSize(10);
    doc.text(`Generado por GCsoft - ${new Date().toLocaleDateString()}`, 15, 290);

    doc.save(`producto_${product.nombre.replace(/\s+/g, '_')}.pdf`);

    toast.current?.show({
      severity: 'success',
      summary: 'PDF generado',
      detail: `PDF de ${product.nombre} generado`,
      life: 3000
    });
  };

  const pdfButtonTemplate = (rowData) => (
    <Button
      icon="pi pi-file-pdf"
      className="p-button-rounded p-button-help p-button-sm"
      onClick={() => exportProductToPDF(rowData)}
      tooltip="Descargar PDF"
    />
  );

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-button-sm"
        onClick={() => onEdit(rowData)}
        tooltip="Editar"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-sm"
        onClick={() => confirmDelete(rowData.id)}
        tooltip="Eliminar"
      />
    </div>
  );

  return (
    <div className="grid p-fluid">
      <Toast ref={toast} />

      <div className="col-12">
        <Card className="shadow-2">
          <DataTable
            value={products}
            scrollable
            scrollHeight="flex"
            emptyMessage="No se encontraron productos"
            tableStyle={{ minWidth: '50rem' }}
          >
            <Column field="nombre" header="Nombre" />
            <Column field="categoria" header="Categoría" />
            <Column field="precio" header="Precio" />
            <Column header="PDF" body={pdfButtonTemplate} style={{ width: '80px' }} />
            <Column header="Acciones" body={actionBodyTemplate} style={{ width: '120px' }} />
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default ProductsView;
