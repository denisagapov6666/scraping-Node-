import React, { useState, useEffect, useRef } from 'react';
import { Table, Badge, Select, Button, Alert } from 'antd';
import axios from 'axios';
import { Excel } from "antd-table-saveas-excel";

const columns = [
  {
    title: 'Images',
    dataIndex: 'images',
    key: 'images',
    render: (images) => {
      return <><img width="100px" height={"100px"} src={images[0]} alt={images[0]} /></>
    },
    width: 120,
    fixed: 'left'
  },
  {
    title: 'Added | Removed',
    dataIndex: 'addRemove',
    key: 'addRemove',
    width: 150,
    render: (addRemove) => {
      if (addRemove === 'new') return <Badge status="success" text="New URL" />
      if (addRemove === 'deleted') return <Badge status="danger" text="Deleted URL" />
      return <Badge status="info" text="New URL" />
    },
    fixed: "left"
  },
  {
    title: 'URL',
    width: 330,
    dataIndex: 'url',
    key: 'url',
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
    title: 'Product Sku',
    dataIndex: 'productSku',
    key: 'productSku',
    width: 150,
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
    width: 150,
  },
  {
    title: 'Collection',
    dataIndex: 'collection',
    key: 'collection',
    width: 150,
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
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
];

const App = () => {

  const tableRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100]
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:8081/get_products_info?pageSize=${pagination.pageSize}&current=${pagination.current}&filter=${filter}`)
      .then(async res => {
        setPagination(prevPagination => {
          return ({
            ...prevPagination,
            pageSizeOptions: res.data.total > 100 ? [20, 50, 100, res.data.total] : [20, 50, 100],
            total: res.data.total
          })
        });
        setData(res.data.products)
        setLoading(false);
      })
  }, [pagination.pageSize, pagination.current, filter])

  const handleChange = (current, pageSize) => {
    setPagination({ ...pagination, current, pageSize })
  };

  const handleDownloadClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns.map(column => ({ title: column.title, dataIndex: column.dataIndex, key: column.key })))
      .addDataSource(data.map(product => ({
        key: product._id,
        addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '',
        url: product.url.url,
        images: product.images.join(" "),
        category: product.category,
        brandName: product.brandName,
        productSku: product.productSku,
        productName: product.productName,
        collection: product.collection,
        color: product.color,
        texture: product.texture,
        fiber: product.fiber,
        construction: product.construction,
        origin: product.origin,
        width: product.width,
        repeatWidth: product.repeatWidth,
        repeatLength: product.repeatLength,
        rollWidth: product.rollWidth
      })), {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  const handleStartScraping = () => {
    setLoading(true);
    axios.get('http://localhost:8081/start_scraping')
      .then(async res => {
        if(res.data.success){
          setVisible(true);
          setLoading(false);
        }
      })
  }

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <Alert
          message="Success Scraping"
          description="Select New and Deleted filter function for checking"
          type="success"
          closable
          onClose={handleClose}
        />
      )}
      <div style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
        <Select
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
          <Button type='primary' danger style={{ margin: "10px" }} onClick={handleStartScraping}>Start Scraping</Button>
          <Button type='primary' onClick={handleDownloadClick}>Download to Excel</Button>
        </div>
      </div>
      <Table
        style={{ marginTop: "20px" }}
        ref={tableRef}
        loading={loading}
        columns={columns}
        dataSource={data.map(product => ({ ...product, url: product.url.url, key: product._id, addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '' }))}
        scroll={{
          x: 1500,
          y: 500,
        }}
        pagination={{
          ...pagination,
          onChange: handleChange
        }}
      />
    </>
  )
};

export default App;