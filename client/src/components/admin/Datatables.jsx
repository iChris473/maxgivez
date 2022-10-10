

import * as React from 'react';
import {useNavigate} from 'react-router';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AuthContext } from "../../context/admin/AuthContext";
import axios from "axios";
import { useRecoilState } from "recoil";
import { productItem } from "../modalAtom";

export default function Tables({query}) {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const {user} = React.useContext(AuthContext)
  const request = axios.create({
    baseURL: "https://maxigivez.herokuapp.com/api",
    headers: { token: `Bearer ${user?.token}`}
  });

  const navigate = useNavigate()
  const [productItems, SetProductItems] = useRecoilState(productItem)
  const [allProducts, setAllProducts] = React.useState([])
  const [fetching, setFetching] = React.useState(true)

  React.useEffect(() => {

    const getProducts = async () => {

      try{

          if(query=='order'){

            const res = await request.get(`/order/get/${user?.id}`)
            
            console.log(res.data)
            
            setAllProducts(res.data)
            
            setFetching(false)

          } else if(query=='users'){

            const res = await request.get(`/user/all/${user?.id}`)
            
            console.log(res.data)
            
            setAllProducts(res.data)
            
            setFetching(false)

          } else {

            const res = await request.get(`/product/get?plat=${query}`)
            // console.log(res.data)
            
            setAllProducts(res.data)
            
            setFetching(false)

          }

      } catch(err) {

        console.log(err)
        setFetching(false)

      }
    }

    getProducts()

  }, [])

  return (
    <TableContainer component={Paper}>
      {fetching ? (
        <h1 className="text-center mx-auto block w-full my-20 text-2xl font-bold text-gray-600">
          Fetching Products...
        </h1>
      ) : (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">
                <p className="flex font-bold text-sm text-white whitespace-nowrap">
                  Product
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="flex font-bold text-sm text-white whitespace-nowrap">
                  Price (NGN)
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="flex font-bold text-sm text-white whitespace-nowrap">
                  Stock
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="flex font-bold text-sm text-white whitespace-nowrap">
                  Category
                </p>
              </StyledTableCell>
              <StyledTableCell align="left">
                <p className="flex font-bold text-sm text-white whitespace-nowrap">
                  Action
                </p>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.map((row) => (
              <StyledTableRow key={row?._id}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex items-center justify-between gap-2">
                    {(row?.picture || row?.reciept) && <img src={row?.picture || row?.reciept} className="h-10 w-10" /> }
                    <p className="flex-1 font-bold text-md text-gray-700 whitespace-nowrap">
                      {row?.name}
                    </p>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <p className="font-bold text-md text-gray-700 whitespace-nowrap">
                    {row?.price?.toLocaleString()}
                  </p>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <p className="flex font-bold text-sm text-gray-700 whitespace-nowrap">
                    {row?.quantity}
                  </p>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <p className="flex font-bold text-sm text-gray-700 whitespace-nowrap capitalize">
                    {row?.category}
                  </p>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <div className="flex items-center justify-start gap-3">
                    <button
                      onClick={() => {
                        SetProductItems(row);
                        window.localStorage.setItem("allGifts", JSON.stringify(row));
                        navigate("/admin/about");
                      }}
                      className="font-bold text-md p-1 px-2 text-white text-center rounded-md bg-green-600 opacity-80"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        SetProductItems(row);
                        window.localStorage.setItem("allGifts", JSON.stringify(row));
                        navigate(`/admin/edit?q=${query}`);
                      }}
                      className="font-bold text-md p-1 px-2 text-center text-white rounded-md bg-pink-600 opacity-80"
                    >
                      Edit
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
