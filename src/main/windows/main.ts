import { BrowserWindow } from 'electron'
import * as path from 'path'

let win: BrowserWindow = null!

export function create() {
  win = new BrowserWindow({
    width: 800,
    height: 500,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.on('ready-to-show', () => {
    win.show()
  })
  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174')
  } else {
    win.loadFile(path.join(__dirname, 'renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
}

export function send(channel: string, ...args: any[]) {
  win.webContents.send(channel, ...args)
}
