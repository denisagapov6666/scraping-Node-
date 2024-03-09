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
              top: "-25px",
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
    title: 'Collection',
    dataIndex: 'collection',
    key: 'collection',
    width: 150,
    align:"center"
  },
  {
    title: 'Fiber',
    dataIndex: 'fiberType',
    key: 'fiberType',
    width: 150,
    filters: [
      { text: 'Wool', value: 'Wool' },
      { text: 'Sisal- Classic', value: 'Sisal- Classic' },
      { text: 'Sisal- Designer', value: 'Sisal- Designer' },
      { text: 'Wool and Sisal', value: 'Wool and Sisal' },
      { text: 'Wool Blends', value: 'Wool Blends' },
    ],
    onFilter: (value, record) => record.brand === value,
    render: (text) => <span>{text}</span>,
    align:"center"
  },

  {
    title: 'Width',
    dataIndex: 'width',
    key: 'width',
    width: 150,
    align:"center"
  },
  {
    title: 'Pattern',
    dataIndex: 'pattern',
    key: 'pattern',
    width: 150,
    align:"center"
  },
  {
    title: 'Pattern Repeat',
    dataIndex: 'patternRepeat',
    key: 'patternRepeat',
    width: 150,
    align:"center"
  },
  {
    title: 'Fiber Composition',
    dataIndex: 'fiberComposition',
    key: 'fiberComposition',
    width: 150,
    align:"center"
  },
  {
    title: 'Backing',
    dataIndex: 'backing',
    key: 'backing',
    width: 150,
    align:"center"
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 150,
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

const Fibre = ({scrollvalue}) => {

  // const [receivedScrollValue, setReceivedScrollValue] = useState(0);

  // // Update the received scroll value when the prop changes
  // useEffect(() => {
  //   setReceivedScrollValue(scrollvalue);
  // }, [scrollvalue]);
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
  const [finalScrapingDate,setFinalScrapingDate] = useState('');
  const [noDataMessage,setNoDataMessage] = useState("");

  window.addEventListener('scroll', function() {
    // Get the scroll position of the window
    const scrollPosition = window.scrollY;
    console.log('Scroll position:', scrollPosition);
  });
  useEffect(() => {
    setLoading(true)
    axios.get(`https://scrapingback.onrender.com/fibreworks/get_products_info`)
    .then(async res => {
      setHistory(res.data.history)
      if(res.data.history.length>0){
        setFinalScrapingDate(moment(res.data.history[res.data.history.length-1].createdAt).format("MMM DD YYYY"))

      }
      // Make sure `res.data.total` correctly represents the total number of items available in the backend
      setPagination(prevPagination => ({
        ...prevPagination,
        total: res.data.total, // This should be the total number of items, not the number of items in the current page
        pageSizeOptions: res.data.total > 100 ? [20, 50, 100, res.data.total] : [20, 50, 100],
      }));
      setOriginData(res.data.products);
      setData(res.data.products);
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
    for (let i = 0; i <= 10; i++) {
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
      for (let i = 0; i <= 10; i++) {
        if (product.imageUrls[i]) {
          rowData[`image_${i}`] = product.imageUrls[i];
        } else {
          rowData[`image_${i}`] = ''; // Populate empty string if no image available
        }
      }
  
      return rowData;
    });
  
    // Add data to the Excel instance
    excel.addSheet('Prestige').addColumns(excelColumns).addDataSource(excelDataSource, { str2Percent: true });
  
    // Save the Excel file
    excel.saveAs('Prestige.xlsx');
  };
  
  const handleStartScraping = async () => {
    setLoading(true);
    info();
    axios.get('https://scrapingback.onrender.com/fibreworks/start_scraping')
      .then(async res => {
        if(res.data.success){
          setHistory(res.data.data.history)
          setFinalScrapingDate(moment(res.data.data.history[res.data.data.history.length-1].createdAt).format("MMM DD YYYY"))
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
      if(filteredData.length===0){
        setNoDataMessage(`No new products since the last scrape on ${finalScrapingDate}`)
      }
    } else if (filter === "deleted") {
      filteredData = originData.filter(element => element.url.deleted === true);
      if(filteredData.length===0){
        setNoDataMessage(`No removed products since the last scrape on ${finalScrapingDate}`)
      }
    }else if(filter === "all"){
      filteredData = originData;
      if(filteredData.length===0){
        setNoDataMessage(`No products that scraped`)
      }
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
    if(filtered.length===0){
      setNoDataMessage(`No Products that matched in Date Picker`)
   }
  
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
    if(filtered.length===0){
      setNoDataMessage(`No Products that searched`)
   }
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
    const filtered = filteredData.filter((item) => item.fiberType === value);
    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1, // Reset pagination to the first page
      total: filtered.length // Update total count based on filtered data length
    }));
    setData(filtered);
  };
  // const formatData = () => {
  //   setLoading(true);
  //   axios.get('https://scrapingback.onrender.com/fibreworks/delete_data')
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
        return (item.url.new === false || item.url.new === true )&& item.url.deleted ===false;
      }).length;
      const deletedAccount = deletedData.filter((item)=>{
        return item.url.deleted === true
      }).length;
      historyData.push({scrapingDate,addedAccount,deletedAccount});
    }
    setModalData(historyData);
  }
  const modalContrl = ()=>{
    setModal2Open(true);
    historyShow();
  }
  return (
    <>
      {
        contextHolder
      }
      <div>
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
              <RangePicker style = {{width:150}} onChange={handleDateRangeChange} disabled={loading}/>
              <Select defaultValue="all" disabled = {loading} onChange={handleBrandChange} style={{ width: 150}}>
                <Option value="all">All Fiber</Option>
                <Option value="Wool">Wool</Option>
                <Option value="Sisal- Classic">Sisal- Classic</Option>
                <Option value="Wool and Sisal">Manta</Option>
                <Option value="Wool Blends">Wool Blends</Option>
                <Option value="Sisal- Designer">Sisal- Designer</Option>
              </Select>

            </div>
          </div>
          <div>
            <Button type='primary' disabled={loading} onClick={handleDownloadClick}>Download to Excel</Button>
            <Button type='primary' disabled={loading} style={{ margin: "0px 10px",width:130}} onClick={handleStartScraping}>Start Scraping</Button>
            {/* <Button type='primary' disabled={loading} danger style={{ margin: "10px" }} onClick={formatData}>Delete Data</Button> */}
            <Button type="primary" onClick={modalContrl} disabled = {loading}>
              Scraping History
            </Button>
            <Modal
              title="History that scrape in FibreWorks page"
              centered
              footer = "Please use DatePicker Filter Function to see more detail product information"

              open={modal2Open}
              onOk={() => setModal2Open(false)}
              onCancel={() => setModal2Open(false)}
            >
              <Table
                dataSource={modalData}
                key="2"
                columns={[
                  { title: 'Scraping Date', dataIndex: 'scrapingDate', key: 'scrapingDate', align:"center"},
                  { title: 'Added Amount', dataIndex: 'addedAccount', key: 'addedAccount',align:"center"},
                  { title: 'Deleted Amount', dataIndex: 'deletedAccount', key: 'deletedAccount',align:"center"}, 
                ]}
                pagination={false} // Disable pagination if all data fits in the modal
              />
            </Modal>
          </div>
        </div>
        <Table
          key="1"
          style={{ margin: "0px 15px 15px 15px" }}
          ref={tableRef}
          loading={loading}
          columns={columns}
          dataSource={data.map(product => ({ ...product, date:moment(product.url.updatedAt).format("YYYY-MM-DD"),url: product.url.url, key: product._id, addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '' }))}
          pagination={{
            ...pagination,
            onChange: handleChange
          }}
          locale={{
            emptyText: noDataMessage
          }}
          />

      </div>
    </>
  )
};

export default Fibre;