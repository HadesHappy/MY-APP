import React, { useState, useEffect } from "react";
import axios from 'axios';
import './table.css';

export const Table = () => {

    interface Content {
        ID: number;
        FirstNameLastName: string;
        Email: string;
        EmailAddress: string;
        Company: string;
        JobTitle: string;
        Phone: string;
    }

    const [lists, setLists] = useState<Array<Content>>([]);
    const [displayDatas, setDisplayDatas] = useState<Array<Content>>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [dataLength, setDataLength] = useState<number>(0);
    const rows: number = 10;
    const getData = async () => {
        const classNameData: any = await axios.get('http://give-me-users-forever.herokuapp.com/api/users/0/next');
        const data = classNameData.data.users;
        setLists(data);
        setDataLength(data.length);
        setDisplayDatas(data.slice(currentPage, currentPage + rows));
        console.log("Lists: ", lists.length);
    }
    const handleClick = (page: number) => {
        if (page < 0) {
            setCurrentPage(0);

        } else if (page > dataLength - rows) {
            setCurrentPage(dataLength - rows);

        }
        else {
            setCurrentPage(page);
            setDisplayDatas(lists.slice(page, page + rows));
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
    }, [currentPage, displayDatas]);

    return (
        <>
            <h2>Students</h2>
            <table>
                <thead>
                    <tr>
                        <th className="id">Id</th>
                        <th className="firstnamelastname">FirstNameLastName</th>
                        <th className="email">Email</th>
                        <th className="emailaddress">EmailAddress</th>
                        <th className="company">Company</th>
                        <th className="jobtitle">JobTitle</th>
                        <th className="phone">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {displayDatas.map(
                        (item, index) =>
                            <tr className='table-row' key={index}>
                                <td>{item.ID}</td>
                                <td>{item.FirstNameLastName}</td>
                                <td>{item.Email}</td>
                                <td>{item.EmailAddress}</td>
                                <td>{item.Company}</td>
                                <td>{item.JobTitle}</td>
                                <td>{item.Phone}</td>
                            </tr>
                    )}
                </tbody>
            </table>
            <div className="buttonGroup">
                <button onClick={() => handleClick(currentPage - 1)}>Previous</button>
                <button onClick={() => handleClick(currentPage + 1)}>Next</button>
            </div>
        </>
    );
}