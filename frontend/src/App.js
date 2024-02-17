import React, { useState, useEffect, useRef } from 'react';
import { Table, Badge, Select } from 'antd';
import axios from 'axios';
import { DownloadTableExcel, useDownloadExcel } from 'react-export-table-to-excel';

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
      .then(res => {
        setData(res.data.products)
        setLoading(false);
        setPagination({
          ...pagination,
          pageSizeOptions: [20, 50, 100, res.data.total],
          total: res.data.total
        })
      })
  }, [pagination.pageSize, pagination.current, filter])

  const handleChange = (pagination) => {
    setPagination(pagination)
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users table',
    sheet: 'Users'
  })

  return (
    <>
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
      <button onClick={()=>onDownload()}> Export excel </button>
      <Table
        ref={tableRef}
        loading={loading}
        columns={columns}
        dataSource={data.map(product => ({ ...product, url: product.url.url, key: product._id, addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '' }))}
        scroll={{
          x: 1500,
          y: 500,
        }}
        pagination={pagination}
        onChange={handleChange}
      />
    </>
  )
};

export default App;