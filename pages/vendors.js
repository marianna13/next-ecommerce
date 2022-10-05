
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,

  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Layout from '../layouts/Main';
import Footer from '../components/footer';
import PositionedMenu from '../components/popup-menu';


const Vendors = (props) => {
  const [vendors, setVendors] = useState();
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/vendors')
      .then((res) => res.json())
      .then((data) => {
        setVendors(data['message'])
        setLoading(false)
      })
  }, [])
  if (!vendors) return <p>Loading...</p>

  return (
    <Layout>
      <section className="vendors-page">
      <div className="container">
      <Card sx={{ height: '100%',minWidth:800 }}>
    <CardHeader
      subtitle={`${vendors.length} всего`}
      title="Поставщики"
    />
    <Divider />
    <List>
      {vendors.map((vendor, i) => (
        <ListItem
          divider={i < vendors.length - 1}
          key={vendor.id}
        >
          <ListItemAvatar>
            <img
              alt={vendor.name}
              src={vendor.logo}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={vendor.name}
            secondary={vendor.address}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <PositionedMenu vid={vendor.id}/>
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
        
      >
        <Link href="addvendor" >
            <a>Добавить</a>
          </Link>
      </Button>
    </Box>
  </Card>
  </div>
  </section>
  <Footer/>
    </Layout>
  
  );
}

export default Vendors;