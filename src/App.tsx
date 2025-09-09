import { useEffect, useState } from 'react';
import FormWarehouse from './components/FormWarehouse';
import Header from './components/Header';
import MainContent, { type DataType } from './components/MainContent';

function App() {
  const [warehouse, setWarehouse] = useState<DataType[]>(() =>
    JSON.parse(localStorage.getItem('warehouse') || '[]'),
  );

  const [dataEdit, setDataEdit] = useState<DataType | null>(null);

  const handleShowEdit = (edit: DataType) => {
    setDataEdit(edit);
  };

  // tự động lưu vào localStorage khi warehouse thay đổi
  useEffect(() => {
    localStorage.setItem('warehouse', JSON.stringify(warehouse));
  }, [warehouse]);

  return (
    <>
      <Header />
      <FormWarehouse
        dataEdit={dataEdit}
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        setDataEdit={setDataEdit}
      />
      <MainContent
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        handleShowEdit={handleShowEdit}
      />
    </>
  );
}

export default App;
