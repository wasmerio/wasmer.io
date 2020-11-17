const cases = [
  {
    text: 'Create binaries that work on any platform',
    // link: '/',
    icon:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMzIgOTQiIGZpbGw9IiNmZmYiPgoJPHBhdGggZD0iTTM0LjQxLDBDMjQuMjYsMCwxOC42LDcuMDEsMTguNiwyMC42N2MwLDEzLjg3LDUuNzEsMjAuMzYsMTUuODEsMjAuMzZjOS43NywwLDE1LjY2LTYuNTksMTUuNjYtMjAuMzYKCQlDNTAuMDcsNy4xMiw0NS4wNSwwLDM0LjQxLDB6IE0zNC40MSwzNS4yNWMtNS40LDAtOC40MS00LjM4LTguNDEtMTQuNThjMC0xMC42NCwzLjE3LTE0Ljk1LDguNDEtMTQuOTVjNS40LDAsOC43LDQuNTgsOC43LDE0Ljk1CgkJQzQzLjExLDMwLjk4LDM5LjY1LDM1LjI1LDM0LjQxLDM1LjI1eiIvPgoJPHBhdGggZD0iTTk3Ljc0LDBDODcuNTksMCw4MS45Miw3LjAxLDgxLjkyLDIwLjY3YzAsMTMuODcsNS43MiwyMC4zNiwxNS44MiwyMC4zNmM5Ljc3LDAsMTUuNjUtNi41OSwxNS42NS0yMC4zNgoJCUMxMTMuMzksNy4xMiwxMDguMzgsMCw5Ny43NCwweiBNOTcuNzQsMzUuMjVjLTUuNCwwLTguODYtNC4zOC04Ljg2LTE0LjU4YzAtMTAuNjQsMy42Mi0xNC45NSw4Ljg2LTE0Ljk1CgkJYzUuNCwwLDguNjksNC41OCw4LjY5LDE0Ljk1QzEwNi40MywzMC45OCwxMDIuOTgsMzUuMjUsOTcuNzQsMzUuMjV6Ii8+Cgk8cGF0aCBkPSJNNzIuMTcsNTIuOTdjLTEwLjE1LDAtMTUuODIsNy4wMS0xNS44MiwyMC42N0M1Ni4zNSw4Ny41MSw2Mi4wNyw5NCw3Mi4xNyw5NGM5Ljc3LDAsMTUuNjUtNi41OSwxNS42NS0yMC4zNgoJCUM4Ny44Miw2MC4wOSw4Mi44MSw1Mi45Nyw3Mi4xNyw1Mi45N3ogTTcyLjE3LDg4LjIyYy01LjQsMC04Ljg2LTQuMzgtOC44Ni0xNC41OGMwLTEwLjY0LDMuNjItMTQuOTUsOC44Ni0xNC45NQoJCWM1LjQsMCw4LjY5LDQuNTgsOC42OSwxNC45NUM4MC44Niw4My45NSw3Ny40MSw4OC4yMiw3Mi4xNyw4OC4yMnoiLz4KCTxwb2x5Z29uIHBvaW50cz0iNjQuMDcsNDAuMzMgNzAuODcsNDAuMzMgNzAuODcsMC45IDU3LjA1LDAuOSA1NS45Nyw2LjkxIDY0LjA3LDYuOTEgCSIvPgoJPHBvbHlnb24gcG9pbnRzPSIzOC41LDkzLjMgNDUuMyw5My4zIDQ1LjMsNTMuODggMzEuNDgsNTMuODggMzAuNCw1OS44IDM4LjUsNTkuODggCSIvPgoJPHBvbHlnb24gcG9pbnRzPSIxMDEuODIsOTMuMyAxMDguNjIsOTMuMyAxMDguNjIsNTMuODggOTQuOCw1My44OCA5My43Miw1OS44OCAxMDEuODIsNTkuODggCSIvPgo8L3N2Zz4K',
  },
  {
    text: 'Run lightweight packages on the edge',
    // link: '/',
    icon:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMzIgODgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI2Ij4KPHBhdGggZD0iTTMsMjdjMTguNDksMzIuNDEsODEuMSw1MS4zOCwxMDgsOCIvPgo8cGF0aCBkPSJNMjQsNDhjMC4wMy0xMy4wOSwyMi0xNiwyMi0xNmwtNiwxMGMwLDAsMTIuNy0yLjczLDE3LTdjNy4yOCwzLjgsMzIuMjIsMTEuMTksNTYtMzEKCWMxNi4zMSwzLjMzLDIxLjcyLDI3LjU2LDYsNTBjLTE2LjM3LDIzLjM0LTMxLjk1LDI4LjM1LTQzLDI5Yy0xMS42NC05LjAxLTE2Ljk1LTEwLjU5LTE5LTExYzIuODMsNy45OCw0LDEyLDQsMTIKCWMtOS41MywwLjMxLTIxLjQ3LTUuNjUtMjktMTUiLz4KPC9zdmc+',
  },
  {
    text: 'Execute untrusted code safely',
    // link: '/',
    icon:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMzIgODgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIj4KPHBhdGggZD0iTTExMSwyOUw5MCw1MEw4MCw0MCIvPgo8cGF0aCBkPSJNOTQsODRDNjQuMyw3MS4yLDYwLDQwLjcsNjAsMjlzMC0yNSwwLTI1aDY4YzAsMCwwLDEzLjMsMCwyNVMxMjMuNiw3MS4yLDk0LDg0eiIvPgo8L3N2Zz4=',
  },
];

export default cases;
