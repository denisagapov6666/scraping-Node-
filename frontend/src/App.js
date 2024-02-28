import React, { useState, useEffect, useRef } from 'react';
import { Table, message, Select, Button, Alert } from 'antd';
import axios from 'axios';
import { Excel } from "antd-table-saveas-excel";
import './App.css';
const columns = [
  {
    title: 'Product Sku',
    dataIndex: 'productSku',
    key: 'productSku',
    width: 150,
    render:(productSku,record)=>{
      return <div style={{textAlign:'center'}}>
        <a style={{textTransform: 'uppercase' }} href={record.url+'?sku='+productSku}>{productSku}</a>  
      </div>
    },
    fixed:"left"
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
    width: 140,
    render:(productName,record)=>{
      return <div style={{textAlign:'center'}}>
        <a style={{textAlign:'center', textTransform: 'uppercase' }} href={record.url+'?sku='+record.productSku}>{productName}</a>  
      </div>
    }
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    width: 100,
    render: color => <span style={{ textTransform: 'uppercase' }}>{color}</span>,
  },
  {
    title: 'Category',
    width: 100,
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Brand Name',
    dataIndex: 'brandName',
    key: 'brandName',
    width: 150,
  },
  {
    title: 'Collection',
    dataIndex: 'collection',
    key: 'collection',
    width: 150,
  },
  {
    title: 'Texture',
    dataIndex: 'texture',
    key: 'texture',
    width: 150,
  },
  {
    title: 'Fiber',
    dataIndex: 'fiber',
    key: 'fiber',
    width: 150,
  },
  {
    title: 'Construction',
    dataIndex: 'construction',
    key: 'construction',
    width: 150,
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
    key: 'origin',
    width: 150,
  },
  {
    title: 'Width',
    dataIndex: 'width',
    key: 'width',
    width: 150,
  },
  {
    title: 'Repeat Width',
    dataIndex: 'repeatWidth',
    key: 'repeatWidth',
    width: 150,
  },
  {
    title: 'Repeat Length',
    dataIndex: 'repeatLength',
    key: 'repeatLength',
    width: 150,
  },
  {
    title: 'Roll Width',
    dataIndex: 'rollWidth',
    key: 'rollWidth',
    width: 150,
  },
  {
    title: 'Other Images',
    dataIndex: 'images',
    key: 'images',
    width: 230,
    render: (images) => {
      // Render all images except the first one inside an anchor tag with a unique key
      return (
        <div style={{width:"100px", textAlign:"center"}}>
          {images.slice(0).map((image, index) => (
            // Use the combination of image URL and index as a unique key
            <a key={image + index} href={image} target="_blank" rel="noopener noreferrer">
              <img width="40px" height="40px" src={image} alt={`product-${index}`} style={{ margin: '3px' }} />
            </a>
          ))}
        </div>
      );
    },
    fixed:"right",
  }
  
];

const App = () => {

  const tableRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100]
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setLoading(true)
    axios.get(`https://scrapingback.onrender.com/get_products_info?pageSize=${pagination.pageSize}&current=${pagination.current}&filter=${filter}`)
    .then(async res => {
      // Make sure `res.data.total` correctly represents the total number of items available in the backend
      setPagination(prevPagination => ({
        ...prevPagination,
        total: res.data.total, // This should be the total number of items, not the number of items in the current page
        pageSizeOptions: res.data.total > 100 ? [20, 50, 100, res.data.total] : [20, 50, 100],
      }));
      setData(res.data.products);
      setLoading(false);
    });

  }, [pagination.pageSize, pagination.current, filter])

  const handleChange = (current, pageSize) => {
    setPagination({ ...pagination, current, pageSize })
  };

  const handleDownloadClick = () => {
    const excel = new Excel();
  
    // Define columns for Excel
    const excelColumns = columns
      .filter(column => column.title !== 'Thumb Image' && column.title !== 'Other Images') // Exclude Thumb Image and Other Images columns
      .map(column => ({ title: column.title, dataIndex: column.dataIndex, key: column.key }));
  
    // Add image columns
    for (let i = 0; i <= 5; i++) {
      excelColumns.push({ title: `Image ${i + 1}`, dataIndex: `image_${i}`, key: `image_${i}` });
    }
  
    // Add data source
    const excelDataSource = data.map(product => {
      const rowData = {
        key: product._id,
        addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '',
        url: product.url.url,
        ...product
      };
  
      // Populate image data for each image column
      for (let i = 0; i <= 5; i++) {
        if (product.images[i]) {
          rowData[`image_${i}`] = product.images[i];
        } else {
          rowData[`image_${i}`] = ''; // Populate empty string if no image available
        }
      }
  
      return rowData;
    });
  
    // Add data to the Excel instance
    excel.addSheet('Products').addColumns(excelColumns).addDataSource(excelDataSource, { str2Percent: true });
  
    // Save the Excel file
    excel.saveAs('Products.xlsx');
  };
  
  const handleStartScraping = () => {
    setLoading(true);
    info();
    axios.get('https://scrapingback.onrender.com/start_scraping')
      .then(async res => {
        if(res.data.success){
          setLoading(false);
          success(`${res.data.data.new} Product(s) is(are) added and ${res.data.data.removed} Product(s) is(are) removed.`);
          setTimeout(window.location.reload(),3000);
        } 
      })
  }

  const formatData = () => {
    setLoading(true);
    axios.get('https://scrapingback.onrender.com/delete_data')
      .then(async res => {
        setLoading(false);
        message.success(res.data.message);
        window.location.reload();
      })
  };
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info({
      content: "Please wait while we process it. You will be notified once it's completed",
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
      duration:5,
    });
  };
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
      duration:5,
      style:{
        marginTop:'10vh'
      }
    });
  };

  return (
    <>
      {
        contextHolder
      }
      <div style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
        <Select
          disabled={loading}
          defaultValue="all"
          style={{ width: 120 }}
          onChange={filter => setFilter(filter)}
          options={[
            { value: 'new', label: 'New' },
            { value: 'deleted', label: 'Deleted' },
            { value: 'all', label: 'All' },
          ]}
        />
        <div>
          <Button type='primary' disabled={loading} danger style={{ margin: "10px" }} onClick={handleStartScraping}>Start Scraping</Button>
          <Button type='primary' disabled={loading} onClick={handleDownloadClick}>Download to Excel</Button>
          <Button type='primary' disabled={loading} danger style={{ margin: "10px" }} onClick={formatData}>Delete Data</Button>
        </div>
      </div>
      <Table
        style={{ margin: "15px" }}
        ref={tableRef}
        loading={loading}
        columns={columns}
        dataSource={data.map(product => ({ ...product, url: product.url.url, key: product._id, addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '' }))}
        pagination={{
          ...pagination,
          onChange: handleChange
        }}
      />
    </>
  )
};

export default App;