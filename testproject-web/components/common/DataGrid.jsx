import React from 'react';
import { Form, Row, Col, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useTable, usePagination } from 'react-table';
import useTranslation from 'next-translate/useTranslation';

const DataGrid = ({ data, schemaColumns, hiddenColumns, pagination, filtering, dashBoard }) => {
    if (data === undefined) return null
    if (Object.keys(data).length === 0 && data.constructor === Object) return null;

    const { t, lang } = useTranslation();

    const getColumns = (data) => {
        const items = Object.getOwnPropertyNames({ ...data[0] });

        const itemsColumns = items.map(function (elem) {
            return {
                Header: <div style={{ textAlign: "center", width: dashBoard ? elem == 'flightNumber' ? "9rem" : "" : "" }}>{t(`${schemaColumns}:${elem}`)} </div>,
                accessor: elem,
            }
        });

        return React.useMemo(
            () => [
                { Header: " ", columns: itemsColumns },

            ],
            []
        );
    }

    const tableInstance = useTable({ columns: getColumns(data), data, autoResetPage: false, autoResetGlobalFilter: false, defaultPageSize: pagination ? 10 : ((data.length + 1) * 100), initialState: { pageIndex: 0, pageSize: pagination ? 10 : ((data.length + 1) * 100), hiddenColumns: hiddenColumns } }, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = tableInstance

    return (
        <div>
            <Row hidden={!filtering} >
                <Col>
                    <Form.Group>
                        <Form.Label htmlFor="search" size="sm" >{t('common:search')}</Form.Label>
                        <Form.Control name="search" type="text" placeholder={t('common:search')}>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Table striped bordered hover responsive="sm" {...getTableProps()}>
                <thead>
                    {

                        <tr {...headerGroups[1].getHeaderGroupProps()}>
                            {headerGroups[1].headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>


                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map((cell, j) => {

                                        return <td style={{ backgroundColor: dashBoard ? data[i].manualData && (j == 0 || j == 1 || j == 2) ? "#0d3050" : "" : "" }} {...cell.getCellProps()}><div style={{ textAlign: "center" }}>  {cell.render('Cell')}</div>  </td>

                                    })


                                }
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Row hidden={!pagination}>
                <Col></Col>
                <Col md="auto">
                    <Form.Group>
                        <Form.Label size="sm">Página:</Form.Label> {' '}
                        <Form.Label size="sm"><strong>{pageIndex + 1} De {pageOptions.length}</strong></Form.Label>{' '}
                        <Form.Label htmlFor="irA" size="sm">| Ir a:</Form.Label>{' '}
                    </Form.Group>
                </Col>
                <Col md="auto">
                    <Form.Control name="irA" size="sm" type="number" min="1" max={pageOptions.length} defaultValue={pageIndex + 1} style={{ width: '70px' }} onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }} />
                </Col>
                <Col md="auto">
                    <Form.Control name="selectPage" size="sm" as="select" style={{ width: '80px' }} value={pageSize} onChange={e => { setPageSize(Number(e.target.value)) }}>
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Ver {pageSize}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
                <Col md="auto">
                    <Pagination size="sm">
                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                    </Pagination>
                </Col>
            </Row>
        </div>
    )
}

export default DataGrid;