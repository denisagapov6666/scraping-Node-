import React, { useState, useEffect, useRef } from 'react';
import { Table, message, Select, Button, Input, DatePicker,Modal} from 'antd';
import axios from 'axios';
import { Excel } from "antd-table-saveas-excel";
import moment from 'moment';

import 'antd/dist/reset.css';

const { RangePicker } = DatePicker;
const { Option } = Select;


const columns = [
  {
    title: 'Product Sku',
    dataIndex: 'productSku',
    key: 'productSku',
    width: 150,
    render: (text, record) => {
      const { productSku, url, addRemove } = record;
      return (
        <div style={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}>
          <span 
            style={{
              position: 'absolute',
              top: "-50px",
              left: 0,
              // transform: 'rotate(-45deg)',
              transformOrigin: 'top left',
              backgroundColor: addRemove === "new" ? 'green' : addRemove === "deleted" ? 'red' : '',
              padding: '2px 5px',
              color: 'white',
            }}
          >
            {addRemove === "new" ? 'New' : addRemove === "deleted" ? 'Removed':""}
          </span>
          <a style={{ textTransform: 'uppercase', marginLeft: 20 }} href={url + '?sku=' + productSku} target="_blank" rel="noopener noreferrer">{productSku}</a>
        </div>
      );
    },
    fixed: "left",
    align:"center"
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
    width: 140,
    render:(productName,record)=>{
      return <div style={{textAlign:'center'}}>
        <a  style={{textAlign:'center', textTransform: 'uppercase' }} href={record.url+'?sku='+record.productSku} target="_blank" rel="noopener noreferrer">{productName}</a>  
      </div>
    },
    align:"center"
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    width: 100,
    render: color => <span style={{ textTransform: 'uppercase' }}>{color}</span>,
    align:"center"
  },
  {
    title: 'Category',
    width: 100,
    dataIndex: 'category',
    key: 'category',
    align:"center"
  },
  {
    title: 'Brand Name',
    dataIndex: 'brandName',
    key: 'brandName',
    width: 150,
    align:"center"
  },
  {
    title: 'Construction',
    dataIndex: 'construction',
    key: 'construction',
    width: 150,
    align:"center",
    filters: [
      { text: 'Hand-Tufted Loop Pile', value: 'Hand-Tufted Loop Pile' },
      { text: 'Face-to-Face Wowen Wilton', value: 'Face-to-Face Wowen Wilton' },
      { text: 'Hand-Loomed Loop Pile', value: 'Hand-Loomed Loop Pile' },
      { text: 'Hand-Loomed Flatweave', value: 'Hand-Loomed Flatweave' },
      { text: 'Hand-Loomed, Tip-Sheared Pile', value: 'Hand-Loomed, Tip-Sheared Pile' },
      { text: 'Woven Writon Loop Pile', value: 'Woven Writon Loop Pile' },
      { text: 'Hand-Loomed Cut and Loop Pile', value: 'Hand-Loomed Cut and Loop Pile' },
      { text: 'Structured Flatwoven', value: 'Structured Flatwoven' },
      { text: 'Face-to-Face Woven Wilton High/Low Cut-Pile', value: 'Face-to-Face Woven Wilton High/Low Cut-Pile' },
    ],
    onFilter: (value, record) => record.brand === value,
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Width',
    dataIndex: 'width',
    key: 'width',
    width: 150,
    align:"center"
  },
  {
    title: 'Repeat',
    dataIndex: 'repeat',
    key: 'repeat',
    width: 150,
    align:"center"
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 150,
    render: date => <span style={{ textTransform: 'uppercase' }}>{moment(date).format("YYYY-MM-DD")}</span>,
    align:"center"
  },
  {
    title: 'Images',
    dataIndex: 'imageUrls',
    key: 'imageUrls',
    width: 120,
    render: (imageUrls) => {
      // Render all images except the first one inside an anchor tag with a unique key
      return (
        <div style={{width:"100px", textAlign:"center"}}>
          {imageUrls.slice(0).map((image, index) => (
            // Use the combination of image URL and index as a unique key
            <a key={image + index} href={image} target="_blank" rel="noopener noreferrer">
              <img width="40px" height="40px" src={image} alt={`product-${index}`} style={{ margin: '3px' }} />
            </a>
          ))}
        </div>
      );
    },
    fixed:"right",
    align:"center"
  }
  
];

const Couristan = () => {

  const tableRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originData,setOriginData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100]
  })
  const [history,setHistory] = useState([]);
  const [modalData,setModalData] = useState([]);

  useEffect(() => {
    setLoading(true)
    axios.get(`https://scrapingback.onrender.com/couristan/get_products_info`)
    .then(async res => {
      console.log(res.data.data.history)
      setHistory(res.data.data.history)

      // Make sure `res.data.total` correctly represents the total number of items available in the backend
      setPagination(prevPagination => ({
        ...prevPagination,
        total: res.data.data.total, // This should be the total number of items, not the number of items in the current page
        pageSizeOptions: res.data.data.total > 100 ? [20, 50, 100, res.data.data.total] : [20, 50, 100],
      }));
      setOriginData(res.data.data.products);
      setData(res.data.data.products);
      setLoading(false);
    });

  },[])

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
      rowData.date = moment(product.url.updatedAt).format("YYYY-MM-DD");
  
      // Populate image data for each image column
      for (let i = 0; i <= 5; i++) {
        if (product.imageUrls[i]) {
          rowData[`image_${i}`] = product.imageUrls[i];
        } else {
          rowData[`image_${i}`] = ''; // Populate empty string if no image available
        }
      }
  
      return rowData;
    });
  
    // Add data to the Excel instance
    excel.addSheet('Couristan').addColumns(excelColumns).addDataSource(excelDataSource, { str2Percent: true });
  
    // Save the Excel file
    excel.saveAs('Couristan.xlsx');
  };
  
  const handleStartScraping = async () => {
    setLoading(true);
    info();
    axios.get('https://scrapingback.onrender.com/couristan/start_scraping')
      .then(async res => {
        if(res.data.success){
          setHistory(res.data.data.history)

          setLoading(false);
          setData(res.data.data.products);
          setOriginData(res.data.data.products);
          setPagination(prevPagination => ({
            ...prevPagination,
            total: res.data.data.total, // This should be the total number of items, not the number of items in the current page
            pageSizeOptions: res.data.data.total > 100 ? [20, 50, 100, res.data.data.total] : [20, 50, 100],
          }));
          success(`${res.data.data.new} Product(s) is(are) added and ${res.data.data.removed} Product(s) is(are) removed.`);
          // await setTimeout(window.location.reload(),3000);
        }else{
          setLoading(false);
          console.log(res.data.message);
          message.warning({
            content:res.data.message,
            style:{
              marginTop:"20vh"
            },
            duration:5
          });
        } 
      })
  }
  const changeFilter = (filter) =>{
    let filteredData = originData;
    if (filter === "new") {
      filteredData = originData.filter(element => element.url.new === true);
    } else if (filter === "deleted") {
      filteredData = originData.filter(element => element.url.deleted === true);
    }else if(filter === "all"){
      filteredData = originData;
    }
    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1, // Reset pagination to the first page
      total: filteredData.length // Update total count based on filtered data length
    }));
    setData(filteredData);
  }
  const handleDateRangeChange = (dates) => {
    if (!dates || dates.length !== 2) {
      setData(originData);
      return;
    }
  
    const [start, end] = dates;
  
    const startDate = start.startOf('day').toDate();
    const endDate = end.endOf('day').toDate();
  
    const filtered = originData.filter((item) => {
      const itemDate = moment(item.url.updatedAt).toDate();
      return itemDate >= startDate && itemDate <= endDate;
    });
  
    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1,
      total: filtered.length
    }));
    setData(filtered);
  };
  
  
  const handleSearch = (e) => {
    let filteredData = originData;
    const value = e.target.value.toLowerCase();
    const filtered = filteredData.filter((item) =>
      item.productSku.toLowerCase().includes(value) ||
      item.productName.toLowerCase().includes(value)
    );
    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1, // Reset pagination to the first page
      total: filtered.length // Update total count based on filtered data length
    }));
    setData(filtered);
  };
  const handleBrandChange = (value) => {
    let filteredData = originData;
    if (value === 'all') {
      setData(filteredData);
      return;
    }
    const filtered = filteredData.filter((item) => item.construction === value);
    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1, // Reset pagination to the first page
      total: filtered.length // Update total count based on filtered data length
    }));
    setData(filtered);
  };
  // const formatData = () => {
  //   setLoading(true);
  //   axios.get('https://scrapingback.onrender.com/couristan/delete_data')
  //     .then(async res => {
  //       setLoading(false);
  //       message.success(res.data.message);
  //       window.location.reload();
  //     })
  // };
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
  const [modal2Open, setModal2Open] = useState(false);
  const historyShow = ()=>{
    const historyData = [];
    for (let i = 0; i < history.length; i++) {
      const scrapingDate = moment(history[i].createdAt).format("YYYY-MM-DD");
      const addedData = originData.filter((item)=>{
        const itemDate = moment(item.url.createdAt).format("YYYY-MM-DD");
        return itemDate === scrapingDate
      })
      const deletedData = originData.filter((item)=>{
        const itemDate = moment(item.url.updatedAt).format("YYYY-MM-DD")
        return itemDate === scrapingDate
      })
      const addedAccount = addedData.filter((item) => {
        return item.url.new === false || item.url.new === true && item.url.deleted ===false;
      }).length;
      const deletedAccount = deletedData.filter((item)=>{
        return item.url.deleted === true
      }).length;
      historyData.push({scrapingDate,addedAccount,deletedAccount});
    }
    setModalData(historyData);
  }
  const modalControl = () => {
    setModal2Open(true);
    historyShow()
  }
  return (
    <>
      {
        contextHolder
      }
      <div style={{position:"fixed",zIndex:"100",top:"64px",padding: "0px 20px", justifyContent: "space-between",backgroundColor:"white", display:"flex",width:"87vw"}}>
        <div style={{display:"flex"}}>
          <div>
            <Select
              disabled={loading}
              defaultValue="all"
              style={{ width: 120 }}
              onChange={(filter) => changeFilter(filter)}
              options={[
                { value: 'new', label: 'New' },
                { value: 'deleted', label: 'Deleted' },
                { value: 'all', label: 'All' },
              ]}
            />
            <Input
            disabled = {loading}
            placeholder="Search Name or SKU"
            onChange={handleSearch}
            style={{ width: 120}}
          />
          </div>

          <div>
          <RangePicker onChange={handleDateRangeChange} style={{width:150}} disabled={loading}/>
          <Select defaultValue="all" disabled = {loading} onChange={handleBrandChange} style={{ width: 150}}>
            <Option value="all">All Construction</Option>
            <Option value="Hand-Tufted Loop Pile">Hand-Tufted Loop Pile</Option>
            <Option value="Face-to-Face Woven Wilton">Face-to-Face Woven Wilton</Option>
            <Option value="Hand-Loomed Loop Pile">Hand-Loomed Loop Pile</Option>
            <Option value="Hand-Loomed Flatweave">Hand-Loomed Flatweave</Option>
            <Option value="Hand-Loomed, Tip-Sheared Pile">Hand-Loomed, Tip-Sheared Pile</Option>
            <Option value="Woven Writon Loop Pile">Woven Writon Loop Pile</Option>
            <Option value="Hand-Loomed Cut and Loop Pile">Hand-Loomed Cut and Loop Pile</Option>
            <Option value="Structured Flatwoven">Structured Flatwoven</Option>
            <Option value="Face-to-Face Woven Wilton High/Low Cut-Pile">Face-to-Face Woven Wilton High/Low Cut-Pile</Option>
          </Select>

          </div>

        </div>
        <div>
          <Button type='primary' disabled={loading} onClick={handleDownloadClick}>Download to Excel</Button>
          <Button type='primary' disabled={loading} style={{ margin: "0px 10px",width:130}} onClick={handleStartScraping}>Start Scraping</Button>
          {/* <Button type='primary' disabled={loading} danger style={{ margin: "10px" }} onClick={formatData}>Delete Data</Button> */}
          <Button type="primary" onClick={modalControl} disabled = {loading}>
              Scraping History
            </Button>
            <Modal
              title="History that scrape in Prestige page"
              centered
              footer = "Please use DatePicker Filter Function to see more detail product information"

              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
            >
              <Table
                dataSource={modalData}
                columns={[
                  { title: 'Scraping Date', dataIndex: 'scrapingDate', key: 'scrapingDate',align:"center" },
                  { title: 'Added Amount', dataIndex: 'addedAccount', key: 'addedAccount',align:"center"},
                  { title: 'Deleted Amount', dataIndex: 'deletedAccount', key: 'deletedAccount',align:"center"}, 
                ]}
                pagination={false} // Disable pagination if all data fits in the modal
              />
            </Modal>
        </div>
        
      </div>
      <Table
        style={{ margin: "15px"}}
        ref={tableRef}
        loading={loading}
        columns={columns}
        dataSource={data.map(product => ({ ...product,date:product.url.updatedAt,url: product.url.url, key: product._id, addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '' }))}
        pagination={{
          ...pagination,
          onChange: handleChange
        }}
        locale={{
          emptyText: 'No removed products since the last scrape on March 6, 2024'
        }}
      />
    </>
  )
};

export default Couristan;