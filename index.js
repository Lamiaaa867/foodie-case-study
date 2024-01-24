import express from 'express'
import { config } from 'dotenv'
import path from 'path';
config({path: path.resolve('./config/config.env')});
import { iniateApp } from './SRC/utils/iniateApp.js';

const app=express();

iniateApp(app,express)