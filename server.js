#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
//var fs = require('fs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
  
var userProfile = function () {
    var self = this;
    self.updatePassword = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.password + "'" + ",@p1 =" + "'" + req.body.securePin + "'" + ",@p2 =" + "'" + req.body.phone + "'" + "; CALL updPassword(@p0,@p1,@p2,@status,@timestamp); SELECT @status as 'status',@timestamp as 'timestamp';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.updatePhone = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.oldPhone + "'" + ",@p1 =" + "'" + req.body.newPhone + "'" + "; CALL updateUserPhone(@p0,@p1,@status,@timestamp); SELECT @status as 'status',@timestamp as 'timestamp';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var records = {data: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    records.data.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(records.data) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.userSignUp = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.name + "'" + ",@p1 =" + "'" + req.body.phone + "'" + ",@p2 =" + "'" + req.body.password + "'" + ",@p3 =" + "'" + req.body.email + "'" + ",@p4 =" + "'" + req.body.address + "'" + ",@p5 =" + "'" + req.body.photo + "'" + ",@p6 =" + "'" + req.body.securePin + "'" + ",@p7 =" + "'" + req.body.opt + "'" + ",@p8 =" + "'" + req.body.deviceId + "'" + "; CALL insUpdUserProfile(@p0,@p1,@p2,@p3,@p4,@p5,@p6,@status,@timestamp,@expiredOn,@p7,@p8); SELECT @status as 'status',@timestamp as 'timestamp',@expiredOn as 'expiredOn';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.userUpdDevice = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.phone + "'" + ",@p1 =" + "'" + req.body.deviceId + "'" + "; CALL updateDeviceId(@p0,@p1,@status,@timeStamp); SELECT @status as 'status',@timeStamp as 'timestamp';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.userSignIn = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: 'SELECT UserProfileID, name, phone, email, address, password, CONVERT(photo USING utf8) as photo, isActive, ExpiredOn, securePin, deviceId, TS FROM tb_userProfile where phone=' + "'" + req.body.phone + "'" + ' and password=' + "'" + req.body.password + "'" + ' and isActive=1;', timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();

                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };


    self.cleanInvoiceDetail = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.userPhone + "'" + "; CALL cleanInvoiceDetail(@p0);", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        res.end('{"status":"pass", "output":"1"}');
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};

var customerProfile = function () {
    var self = this;
    self.saveCustomer = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.CustomerID + "'" + ",@p1 =" + "'" + req.body.userPhone + "'" + ",@p2 =" + "'" + req.body.name + "'" + ",@p3 =" + "'" + req.body.phone + "'" + ",@p4 =" + "'" + req.body.email + "'" + ",@p5 =" + "'" + req.body.address + "'" + ",@p6 =" + "'" + req.body.photo + "'" + ",@p7 =" + "'" + req.body.isActive + "'" + "; CALL insUpdCustomer(@p0,@p1,@p2,@p3,@p4,@p5,@p6,@status,@timestamp,@p7); SELECT @status as 'status',@timestamp as 'timestamp'," + req.body.CustomerID + " as 'CustomerID';", timestamp: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};

var supplierProfile = function () {
    var self = this;
    self.saveSupplier = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.SupplierID + "'" + ",@p1 =" + "'" + req.body.userPhone + "'" + ",@p2 =" + "'" + req.body.name + "'" + ",@p3 =" + "'" + req.body.phone + "'" + ",@p4 =" + "'" + req.body.email + "'" + ",@p5 =" + "'" + req.body.address + "'" + ",@p6 =" + "'" + req.body.photo + "'" + ",@p7 =" + "'" + req.body.isActive + "'" + "; CALL insUpdSupplier(@p0,@p1,@p2,@p3,@p4,@p5,@p6,@status,@timestamp,@p7); SELECT @status as 'status',@timestamp as 'timestamp'," + req.body.SupplierID + " as 'SupplierID';", timestamp: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};

var Inventory = function () {
    var self = this;
    self.saveInventory = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.InventoryNo + "'" + ",@p1 =" + "'" + req.body.inventoryName + "'" + ",@p2 =" + "'" + req.body.parentId + "'" + ",@p3 =" + "'" + req.body.quantity + "'" + ",@p4 =" + "'" + req.body.itemPrice + "'" + ",@p5 =" + "'" + req.body.unit + "'" + ",@p6 =" + "'" + req.body.userPhone + "'" + ",@p7 =" + "'" + req.body.isActive + "'" + ",@p8 =" + "'" + req.body.itemType + "'" + "; CALL insUpdInventory(@p0,@p1,@p2,@p3,@p4,@p5,@p6,@p8,@status,@timestamp,@p7); SELECT @status as 'status',@timestamp as 'timestamp'," + req.body.InventoryNo + " as 'InventoryNo';", timestamp: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};

var manageInvoice = function () {
    var self = this;
    self.createInvoice = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                var queryString = "SET @p0 =" + "'" + req.body.InvoiceNo + "'" + ",@p1 =" + "'" + req.body.invoiceDate + "'" + ",@p2 =" + "'" + req.body.isCustomer + "'" + ",@p3 =" + "'" + req.body.custSupp + "'" + ",@p4 =" + "'" + req.body.userPhone + "'" + ",@p5 =" + "'" + req.body.opt + "'" + ",@p6 =" + "'" + req.body.isActive + "'" + ",@p7 =" + "''" + "; CALL createInvoice(@p0,@p1,@p2,@p3,@p4,@p5,@status,@timestamp,@p6,@p7); SELECT @status as 'status',@timestamp as 'timestamp'," + req.body.InvoiceNo + " as 'InvoiceNo';";
                if (req.body.friendlyName)
                    queryString = "SET @p0 =" + "'" + req.body.InvoiceNo + "'" + ",@p1 =" + "'" + req.body.invoiceDate + "'" + ",@p2 =" + "'" + req.body.isCustomer + "'" + ",@p3 =" + "'" + req.body.custSupp + "'" + ",@p4 =" + "'" + req.body.userPhone + "'" + ",@p5 =" + "'" + req.body.opt + "'" + ",@p6 =" + "'" + req.body.isActive + "'" + ",@p7 =" + "'" + req.body.friendlyName + "'" + "; CALL createInvoice(@p0,@p1,@p2,@p3,@p4,@p5,@status,@timestamp,@p6,@p7); SELECT @status as 'status',@timestamp as 'timestamp'," + req.body.InvoiceNo + " as 'InvoiceNo';";
                connection.query({sql: queryString, timestamp: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.createInvoiceItem = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p1 =" + "'" + req.body.InvoiceNo + "'" + ",@p2 =" + "'" + req.body.brand + "'" + ",@p3 =" + "'" + req.body.category + "'" + ",@p4 =" + "'" + req.body.categoryItem + "'" + ",@p5 =" + "'" + req.body.quantity + "'" + ",@p6 =" + "'" + req.body.itemPrice + "'" + ",@p7 =" + "'" + req.body.itemDescription + "'" + ",@p8 =" + "'" + req.body.InventoryNo + "'" + ",@p9 =" + "'" + req.body.itemUnit + "'" + ",@p10 =" + "'" + req.body.userPhone + "'" + ",@p11 =" + "'" + req.body.isCust + "'" + ",@p12 =" + "'" + req.body.invoiceItemDate + "'" + ",@p13 =" + "'" + req.body.isActive + "'" + "; CALL insUpdInvoiceItem(@p1,@p2,@p3,@p4,@p5,@p6,@p7,@p8,@p9,@p10,@p11,@status,@timestamp,@p12,@p13); SELECT @status as 'status',@timestamp as 'timestamp'," + req.body.InvoiceItemNo + " as 'InvoiceItemNo';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getInvoiceItem = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.InvoiceNo + "'" + ",@p1 =" + "'" + req.body.userPhone + "'" + "; CALL getInvoiceItem(@p0,@p1,@status);SELECT @status as 'status';", timeout: 10000}, function (err, rows) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var invoiceRecords = {invoiceItemData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    invoiceRecords.invoiceItemData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(invoiceRecords.invoiceItemData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.deleteInvoice = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.InvoiceNo + "'" + ",@p1 =" + "'" + req.body.userPhone + "'" + "; CALL deleteInvoice(@p0,@p1,@status,@timestamp);SELECT @status as 'status',@timestamp as 'timestamp';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getInvoice = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.invoiceDate + "'" + ",@p1 =" + "'" + req.body.isCustomer + "'" + ",@p2 =" + "'" + req.body.custSupp + "'" + ",@p3 =" + "'" + req.body.InvoiceNo + "'" + ",@p4 =" + "'" + req.body.isSearchByDate + "'" + ",@p5 =" + "'" + req.body.userPhone + "'" + "; CALL searchInvoice(@p0,@p1,@p2,@p3,@p4,@p5,@status);SELECT @status as 'status';", timeout: 10000}, function (err, rows) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var invoiceRecords = {invoiceItemData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    invoiceRecords.invoiceItemData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(invoiceRecords.invoiceItemData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};

var Transaction = function () {
    var self = this;
    self.saveTransaction = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                var queryString = "SET @p0 =" + "'" + req.body.tranDate + "'" + ",@p1 =" + "'" + req.body.isIntiatedByOwner + "'" + ",@p2 =" + "'" + req.body.isCustomer + "'" + ",@p3 =" + "'" + req.body.custSupp + "'" + ",@p4 =" + "'" + req.body.ammount + "'" + ",@p5 =" + "'" + req.body.InvoiceNo + "'" + ",@p6 =" + "'" + req.body.userPhone + "'" + ",@p7 =" + "'" + req.body.opt + "'" + ",@p8 =" + "'" + req.body.isActive + "'" + ",@p9 =" + "'0'" + "; CALL createTransaction(@p0,@p1,@p2,@p3,@p4,@p5,@p6,@p7,@status,@timestamp,@p8,@p9); SELECT @status as 'status',@timestamp as 'timestamp'," + req.body.TranNo + " as 'TranNo';";
                if (req.body.otherTax)
                    queryString = "SET @p0 =" + "'" + req.body.tranDate + "'" + ",@p1 =" + "'" + req.body.isIntiatedByOwner + "'" + ",@p2 =" + "'" + req.body.isCustomer + "'" + ",@p3 =" + "'" + req.body.custSupp + "'" + ",@p4 =" + "'" + req.body.ammount + "'" + ",@p5 =" + "'" + req.body.InvoiceNo + "'" + ",@p6 =" + "'" + req.body.userPhone + "'" + ",@p7 =" + "'" + req.body.opt + "'" + ",@p8 =" + "'" + req.body.isActive + "'" + ",@p9 =" + "'" + req.body.otherTax + "'" + "; CALL createTransaction(@p0,@p1,@p2,@p3,@p4,@p5,@p6,@p7,@status,@timestamp,@p8,@p9); SELECT @status as 'status',@timestamp as 'timestamp'," + req.body.TranNo + " as 'TranNo';";
                connection.query({sql: queryString, timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var tranRecords = {tranData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    tranRecords.tranData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(tranRecords.tranData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getTransaction = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.InvoiceNo + "'" + ",@p1 =" + "'" + req.body.invoiceDate + "'" + ",@p2 =" + "'" + req.body.isCustomer + "'" + ",@p3 =" + "'" + req.body.custSupp + "'" + ",@p4 =" + "'" + req.body.userPhone + "'" + "; CALL searchTransaction(@p0,@p1,@p2,@p3,@p4,@status); SELECT @status as 'status';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var tranRecords = {tranData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    tranRecords.tranData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(tranRecords.tranData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getTransactionByDate = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.InvoiceNo + "'" + ",@p1 =" + "'" + req.body.invoiceDate + "'" + ",@p2 =" + "'" + req.body.isCustomer + "'" + ",@p3 =" + "'" + req.body.custSupp + "'" + ",@p4 =" + "'" + req.body.userPhone + "'" + ",@p5 =" + "'" + req.body.invoiceEndDate + "'" + "; CALL searchTranByDate(@p0,@p1,@p2,@p3,@p4,@p5,@status); SELECT @status as 'status';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var tranRecords = {tranData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    tranRecords.tranData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(tranRecords.tranData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getPayableAmt = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.userPhone + "'" + "; CALL getPayableAmt(@p0,@amount,@status); SELECT @amount as 'amount',@status as 'status';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var tranRecords = {tranData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    tranRecords.tranData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(tranRecords.tranData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getReceivableAmt = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.userPhone + "'" + "; CALL getReceivableAmt(@p0,@amount,@status); SELECT @status as 'status',@amount as 'amount';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var tranRecords = {tranData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    tranRecords.tranData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(tranRecords.tranData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getListPayabaleReceivable = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.filter + "'" + ",@p1 =" + "'" + req.body.noOfRecord + "'" + ",@p2 =" + "'" + req.body.isPayabale + "'" + ",@p3 =" + "'" + req.body.userPhone + "'" + "; CALL getListPayabaleReceivable(@p0,@p1,@p2,@p3,@status); SELECT @status as 'status';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var tranRecords = {tranData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    tranRecords.tranData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(tranRecords.tranData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};

var configSettings = function () {
    var self = this;
    self.saveConfigSetting = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.payDangerLimit + "'" + ",@p1 =" + "'" + req.body.payWarningLimit + "'" + ",@p2 =" + "'" + req.body.payInfoLimit + "'" + ",@p3 =" + "'" + req.body.recDangerLimit + "'" + ",@p4 =" + "'" + req.body.recWarningLimit + "'" + ",@p5 =" + "'" + req.body.recInfoLimit + "'" + ",@p6 =" + "'" + req.body.payFilterBy + "'" + ",@p7 =" + "'" + req.body.recFilterBy + "'" + ",@p8 =" + "'" + req.body.payNoRecords + "'" + ",@p9 =" + "'" + req.body.recNoRecords + "'" + ",@p10 =" + "'" + req.body.userPhone + "'" + "; CALL insUpdConfigSettings(@p0,@p1,@p2,@p3,@p4,@p5,@p6,@p7,@p8,@p9,@p10,@status,@timestamp); SELECT @status as 'status',@timestamp as 'timestamp';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getConfigSetting = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.userPhone + "'" + "; CALL getConfigSetting(@p0);", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var records = {tranData: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    records.tranData.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(records.tranData) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};

var printingRequest = function () {
    var self = this;
    self.createPrintRequest = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.userPhone + "'" + ",@p1 =" + "'" + req.body.fromDate + "'" + ",@p2 =" + "'" + req.body.toDate + "'" + "; CALL createPrintRequest(@p0,@p1,@p2,@status); SELECT @status as 'status';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getPrintCharges = function (req, res, pool)
    {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SELECT * FROM tb_printCharges ORDER BY CreatedDate DESC LIMIT 1;", timeout: 10000}, function (err, rows) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(rows) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};

var synchDataOperations = function () {
    var self = this;
    self.getBaseData = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.userPhone + "'" + ",@p1 =" + "'" + req.body.invoiceCount + "'" + "; CALL getBaseTableData(@p0,@p1,@status); SELECT @status as 'status';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var baseTableRecords = {data: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    baseTableRecords.data.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(baseTableRecords.data) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getRecCountToSynch = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                connection.query({sql: "SET @p0 =" + "'" + req.body.userPhone + "'" + ",@p1 =" + "'" + req.body.RecordType + "'" + ",@p2 =" + "'" + req.body.MaxTS + "'" + "; CALL getRecCountToSynch(@p0,@p1,@p2,@status,@noOfRecords); SELECT @status as 'status',@noOfRecords as 'noOfRecords';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var baseTableRecords = {data: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    baseTableRecords.data.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(baseTableRecords.data) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };

    self.getRecordToSynch = function (req, res, pool) {
        try {
            res.setHeader('Content-Type', 'text/plain');
            pool.getConnection(function (err, connection) {
                var listOfInvoiceNo = req.body.lstInvoiceNo;
                listOfInvoiceNo = listOfInvoiceNo.replace(/\$/g, ',');
                connection.query({sql: "SET @p0 =" + "'" + req.body.userPhone + "'" + ",@p1 =" + "'" + req.body.RecordType + "'" + ",@p2 =" + "'" + req.body.MaxTS + "'" + ",@p3 =" + "'" + req.body.NoOfRecord + "'" + ",@p4 =" + "\"" + listOfInvoiceNo + "\"" + "; CALL getRecordToSynch(@p0,@p1,@p2,@status,@p3,@p4); SELECT @status as 'status';", timeout: 10000}, function (err, rows, fields) {
                    if (err)
                        res.end('{"status":"fail", "output":' + err + '}');
                    else
                    {
                        if (rows.length > 0)
                        {
                            var baseTableRecords = {data: []};
                            for (i = 0; i < rows.length; i++)
                            {
                                if (Array.isArray(rows[i]))
                                    baseTableRecords.data.push(rows[i]);
                            }
                            res.end('{"status":"pass", "output":"1", "data":' + JSON.stringify(baseTableRecords.data) + '}');
                        }
                        else
                        {
                            res.end('{"status":"pass", "output":-1}');
                        }
                    }
                    connection.release();
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        }
        catch (err)
        {
            res.end('{"status":"fail", "output":' + err + '}');
        }
    };
};
/**
 *  Define the sample application.
 */  
var SampleApp = function () {
    
    var userProfileObj = new userProfile();
    var custProfileObj = new customerProfile();
    var suppProfileObj = new supplierProfile();
    var inventoryObj = new Inventory();
    var invoiceObj = new manageInvoice();
    var tranObj = new Transaction();
    var cofigObj = new configSettings();
    var synchObj = new synchDataOperations();
    var printObj = new printingRequest();
    //  Scope.
    var self = this;
    self.setupVariables = function () {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
        self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        self.hostname = process.env.OPENSHIFT_MYSQL_DB_HOST || '0.0.0.0';

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 0.0.0.0 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 0.0.0.0');
            self.ipaddress = "127.0.0.1";
        }
        ;
    };
var connection = mysql.createConnection({
        host: process.env.MYSQL_DB_HOST,
        user: 'process.env.MYSQL_USER',
        password: 'process.env.MYSQL_PASSWORD',
        database: 'process.env.OPENSHIFT_GEAR_NAME'
    });
 
 var pool = mysql.createPool({
        connectionLimit: 10,
        waitForConnections: true,
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_DB_PORT,
        multipleStatements: true
    });

 

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function () {
        //self.app = express.createServer();       
        self.app = express();
        self.app.use(bodyParser.urlencoded({extended: false}));
        self.app.use(bodyParser.json());
        // GET method route
        self.app.get('/', function (req, res) {
            res.send('Received request');
        });
        self.app.get('/db', function (req, res) {
            res.send('DB connection');
        });
        self.app.post('/authenticate', function (req, res) {
            //res.end(req.body.phone);
            userProfileObj.userSignIn(req, res, pool);
        });
        self.app.post('/updDevice', function (req, res) {
            //res.end(req.body.phone);
            userProfileObj.userUpdDevice(req, res, pool);
        });
        self.app.post('/signUP', function (req, res) {
            userProfileObj.userSignUp(req, res, pool);
        });
        self.app.post('/updPwd', function (req, res) {
            userProfileObj.updatePassword(req, res, pool);
        });
        self.app.post('/updPhone', function (req, res) {
            userProfileObj.updatePhone(req, res, pool);
        });
        self.app.post('/updCustomer', function (req, res) {
            custProfileObj.saveCustomer(req, res, pool);
        });
        self.app.post('/updSupplier', function (req, res) {
            suppProfileObj.saveSupplier(req, res, pool);
        });
        self.app.post('/updInventory', function (req, res) {
            inventoryObj.saveInventory(req, res, pool);
        });
        self.app.post('/cpInventory', function (req, res) {
            inventoryObj.copyInventory(req, res, pool);
        });
        self.app.post('/makeInvoice', function (req, res) {
            invoiceObj.createInvoice(req, res, pool);
        });
        self.app.post('/makeInvoiceItem', function (req, res) {
            invoiceObj.createInvoiceItem(req, res, pool);
        });
        self.app.post('/getInvoiceItem', function (req, res) {
            invoiceObj.getInvoiceItem(req, res, pool);
        });
        self.app.post('/deleteInvoice', function (req, res) {
            invoiceObj.deleteInvoice(req, res, pool);
        });
        self.app.post('/getInvoice', function (req, res) {
            invoiceObj.getInvoice(req, res, pool);
        });
        self.app.post('/saveTran', function (req, res) {
            tranObj.saveTransaction(req, res, pool);
        });
        self.app.post('/getTran', function (req, res) {
            tranObj.getTransaction(req, res, pool);
        });
        self.app.post('/getTranDate', function (req, res) {
            tranObj.getTransactionByDate(req, res, pool);
        });

        self.app.post('/getPayableAmt', function (req, res) {
            tranObj.getPayableAmt(req, res, pool);
        });
        self.app.post('/getReceivableAmt', function (req, res) {
            tranObj.getReceivableAmt(req, res, pool);
        });
        self.app.post('/getListPR', function (req, res) {
            tranObj.getListPayabaleReceivable(req, res, pool);
        });
        self.app.post('/saveCS', function (req, res) {
            cofigObj.saveConfigSetting(req, res, pool);
        });
        self.app.post('/getCS', function (req, res) {
            cofigObj.getConfigSetting(req, res, pool);
        });
        self.app.post('/getBTD', function (req, res) {
            synchObj.getBaseData(req, res, pool);
        });
        self.app.post('/getRecCntSync', function (req, res) {
            synchObj.getRecCountToSynch(req, res, pool);
        });
        self.app.post('/getRecSync', function (req, res) {
            synchObj.getRecordToSynch(req, res, pool);
        });
        self.app.post('/printReq', function (req, res) {
            printObj.createPrintRequest(req, res, pool);
        });
        self.app.get('/getprintCharg', function (req, res) {
            printObj.getPrintCharges(req, res, pool);
        });
        self.app.post('/cleanInvDet', function (req, res) {
            userProfileObj.cleanInvoiceDetail(req, res, pool);
        });
        


    };

    /**
     *  Initializes the sample application.
     */
    self.initialize = function () {
        self.setupVariables();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function () {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function () {
            console.log('%s: Node server started on %s:%d ...',
                    Date(Date.now()), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */

/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();