import Vue from 'vue'

if (!localStorage.getItem("items")) {
  localStorage.setItem("items", JSON.stringify([{
    "id": 1,
    "name": "Novel - Mariposa",
    "description": "Novel Mariposa merupakan salah satu karya penulis Luluk HF. Dia dikenal cukup aktif menulis di platform Wattpad. Dari berbagai karya yang sudah dibuatnya, novel Mariposa menjadi karya yang paling banyak dilirik dan dibaca, khususnya oleh remaja perempuan. Hingga saat ini, diketahui lebih dari 100 juta pembaca sudah membaca  novel tersebut.",
    "active": 1,
    "created_at": "2024-04-29 08:42:22",
    "updated_at": "2024-04-29 09:08:43"
  },{
    "id": 2,
    "name": "Pendidikan - Morfologi",
    "description": "Morfologi adalah salah satu cabang linguistik yang mempelajari seluk beluk proses pembentukan tata dan perubahan makna kata. Morfologi tidak lepas dari yang namanya morfem dan kata. Morfem adalah satuan gramatikal terkecil yang memiliki makna. Sedangkan kata menurut Kamus Besar Bahasa Indonesia (KBBI) adalah elemen terkecil dalam sebuah bahasa yang diucapkan atau dituliskan dan merupakan realisasi kesatuan perasaan dan pikiran yang dapat digunakan dalam berbahasa.",
    "active": 1,
    "created_at": "2024-04-29 08:45:07",
    "updated_at": "2024-04-29 08:45:24"
  }]))
}

function getMaxID() {
  let items = JSON.parse(localStorage.getItem("items"))
  let max = 0
  for (let i=0;i<items.length;i++) {
    if (items[i].id > max) {
      max = items[i].id
    }
  }
  return max
}

const actions = {
  // table data
  getItems ({ commit, getters, dispatch }) {
    commit('setLoadingStatus', true)
    commit('setItems', JSON.parse(localStorage.getItem("items")))
    commit('setLoadingStatus', false)
    Vue.http.get(getters.path('i'))
      .then((response) => {
        console.log(response.body)
        /* commit('setItems', response.body)
        commit('setLoadingStatus', false) */
      }, (error) => {
        dispatch('openAlertBox', [
          'alertError',
          error.statusText,
        ], { root: true })
      })
  },
  getItemsServerSide ({ commit, getters, dispatch }, [params]) {
    return new Promise((resolve, reject) => {
      commit('setLoadingStatus', true)
      Vue.http.post(`${getters.path('i')}/search`, params)
        .then((response) => {
          commit('setItemsServerSide', response.body)
          resolve()
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            error.statusText,
          ], { root: true })
          reject(error)
        })
    })
  },
  // item details
  getItem ({ commit, getters, dispatch }, [id]) {
    return new Promise((resolve, reject) => {
      commit('setDetailsLoader', true)
      let items = JSON.parse(localStorage.getItem("items"))
      for (let i = 0;i < items.length;i ++) {
        if (items[i].id == id) {
            commit('setItem', items[i])
            commit('setDetailsLoader', false)
            resolve()
          return 
        }
      }
      /* Vue.http.get(`${getters.path('sh')}/${id}`)
        .then((response) => {
          commit('setItem', response.body)
          commit('setDetailsLoader', false)
          resolve()
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            error.statusText,
          ], { root: true })
          reject(error)
        }) */
    })
  },
  updateItem ({
    getters, dispatch,
  }, [
    id,
    params,
    successText,
    errorText,
  ]) {
    return new Promise((resolve, reject) => {
      
      let items = JSON.parse(localStorage.getItem("items"))
      for (let i = 0;i < items.length;i ++) {
        if (items[i].id == id) {
          items[i].name = params.name
          items[i].description = params.description
          localStorage.setItem("items",JSON.stringify(items))
          
          dispatch('runItemsViewRefreshing')
          resolve()
        }
      }
     /*  console.log(params)
      Vue.http.post(`${getters.path('u')}/update/${id}`, params)
        .then((response) => {
          if (response.body.status === 0) {
            dispatch('openAlertBox', [
              'alertSuccess',
              successText,
            ], { root: true })
            dispatch('runItemsViewRefreshing')
            resolve()
          } else if (response.body.status === -1) {
            dispatch('openAlertBox', [
              'alertError',
              response.body.msg,
            ], { root: true })
          } else if (response.body.status === -2) {
            dispatch('openAlertBox', [
              'alertValidationError',
              response.body.msg,
            ], { root: true })
          }
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            errorText,
          ], { root: true })
          reject(error)
        }) */
    })
  },
  storeItem ({
    commit, state, getters, dispatch,
  }, [
    params,
    successText,
    errorText,
  ]) {
    return new Promise((resolve, reject) => {
      let items = JSON.parse(localStorage.getItem("items"))
      items.push({
        "id": getMaxID() + 1,
        "name": params.name,
        "description": params.description,
        "active":1,
        "created_at": "",
        "updated_at": ""
      })
      localStorage.setItem("items", JSON.stringify(items))
      dispatch('openAlertBox', [
        'alertSuccess',
        successText,
      ], { root: true })
      dispatch('runItemsViewRefreshing')
      resolve()
      /* Vue.http.post(getters.path('st'), params)
        .then((response) => {
          if (response.body.status === 0) {
            dispatch('openAlertBox', [
              'alertSuccess',
              successText,
            ], { root: true })
            dispatch('runItemsViewRefreshing')
            resolve()
          } else if (response.body.status === -1) {
            dispatch('openAlertBox', [
              'alertError',
              response.body.msg,
            ], { root: true })
          } else if (response.body.status === -2) {
            dispatch('openAlertBox', [
              'alertValidationError',
              response.body.msg,
            ], { root: true })
          }
          if (state.createdElement.mode === 'inform') {
            console.log('response id', response.body.id)
            commit('setCreatedItemStatus', [
              true,
              response.body.id,
            ])
          }
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            errorText,
          ], { root: true })
          reject(error)
        }) */
    })
  },
  deleteItem ({
    getters, dispatch,
  }, [
    id,
    successText,
    errorText,
  ]) {
    let items = JSON.parse(localStorage.getItem("items"))
    items = items.filter((v) => v.id != id)
    localStorage.setItem("items", JSON.stringify(items))
    dispatch('openAlertBox', [
      'alertSuccess',
      successText,
    ], { root: true })
    dispatch('runItemsViewRefreshing')

    /* Vue.http.get(`${getters.path('d')}/destroy/${id}`)
      .then(() => {
        dispatch('openAlertBox', [
          'alertSuccess',
          successText,
        ], { root: true })
        dispatch('runItemsViewRefreshing')
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      }) */
  },
  mulitipleItemsUpdate ({
    getters, dispatch,
  }, [
    params,
    successText,
    errorText,
  ]) {
    let items = JSON.parse(localStorage.getItem("items"))
    for (let i=0;i<items.length;i++) {
      for (let ii=0;ii<params.ids.length;ii++) {
        if (items[i].id == params.ids[ii]) {
          items[i].description = params.request.description
        }
      }
    }
    localStorage.setItem("items", JSON.stringify(items))
    dispatch('openAlertBox', [
      'alertSuccess',
      successText,
    ], { root: true })
    dispatch('runItemsViewRefreshing')
    /* Vue.http.post(`${getters.path('mu')}/multiple-update`, params)
      .then(() => {
        dispatch('openAlertBox', [
          'alertSuccess',
          successText,
        ], { root: true })
        dispatch('runItemsViewRefreshing')
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      }) */
  },
  mulitipleItemsDelete ({
    getters, dispatch,
  }, [
    ids,
    successText,
    errorText,
  ]) {
    
    console.log(ids)
    let items = JSON.parse(localStorage.getItem("items"))
    for (let i=0;i<ids["ids"].length;i++) {
      console.log(ids["ids"][i])
      items = items.filter((v) => v.id != ids["ids"][i])
    }
    localStorage.setItem("items", JSON.stringify(items))
    dispatch('openAlertBox', [
      'alertSuccess',
      successText,
    ], { root: true })
    dispatch('runItemsViewRefreshing')
   /*  Vue.http.post(`${getters.path('md')}/multiple-delete`, ids)
      .then(() => {
        dispatch('openAlertBox', [
          'alertSuccess',
          successText,
        ], { root: true })
        dispatch('runItemsViewRefreshing')
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      }) */
  },
  // item elements
  getItemElements ({ commit, state }) {
    const url = state.itemElements.url.replace('{id}', state.itemElements.id)
    Vue.http.get(url)
      .then(response => commit('setItemElements', response.body))
  },
  addItemElement ({
    dispatch, state,
  }, [
    params,
    successText,
    errorText,
  ]) {
    Vue.http.post(state.itemElements.controller, params)
      .then(() => {
        dispatch('openAlertBox', [
          'alertSuccess',
          successText,
        ], { root: true })
        dispatch('getItemElements')
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      })
  },
  removeItemElement ({
    dispatch, state,
  }, [
    id,
    successText,
    errorText,
  ]) {
    console.log("DELETE 2")
    Vue.http.delete(`${state.itemElements.controller}/${id}`)
      .then(() => {
        dispatch('openAlertBox', [
          'alertSuccess',
          successText,
        ], { root: true })
        dispatch('getItemElements')
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      })
  },
  addManyItemElements ({
    dispatch, state,
  }, [
    params,
    successText,
    errorText,
  ]) {
    Vue.http.post(`${state.itemElements.controller}/multiple-add`, params)
      .then(() => {
        dispatch('openAlertBox', [
          'alertSuccess',
          successText,
        ], { root: true })
        dispatch('getItemElements')
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      })
  },
  removeManyItemElements ({
    dispatch, state,
  }, [
    ids,
    successText,
    errorText,
  ]) {
    Vue.http.post(`${state.itemElements.controller}/multiple-delete`, ids)
      .then(() => {
        dispatch('openAlertBox', [
          'alertSuccess',
          successText,
        ], { root: true })
        dispatch('getItemElements')
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      })
  },
  // extented details
  getItemDetails ({ commit, getters, dispatch }, [id]) {
    return new Promise((resolve, reject) => {
      commit('setDetailsLoader', true)
      Vue.http.get(`${getters.path('sh')}/${id}`)
        .then((response) => {
          commit('itemDetails', response.body)
          commit('setDetailsLoader', false)
          resolve()
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            error.statusText,
          ], { root: true })
          reject(error)
        })
    })
  },
  updateItemDetail ({
    dispatch, state, getters,
  }, [
    id,
    params,
    successText,
  ]) {
    Vue.http.put(`${getters.path('u')}/${id}`, params)
      .then((response) => {
        if (response.body.status === 0) {
          dispatch('openAlertBox', [
            'alertSuccess',
            successText,
          ], { root: true })
        } else if (response.body.status === -1) {
          dispatch('openAlertBox', [
            'alertError',
            response.body.msg,
          ], { root: true })
        } else if (response.body.status === -2) {
          dispatch('openAlertBox', [
            'alertValidationError',
            response.body.msg,
          ], { root: true })
        }
        dispatch('getItemDetails', [state.item[state.itemIdColumn]])
      }, (error) => {
        dispatch('openAlertBox', [
          'alertError',
          error.statusText,
        ], { root: true })
      })
  },
  // child details
  updateChild ({
    dispatch, state,
  }, [
    id,
    params,
    successText,
    path,
  ]) {
    return new Promise((resolve, reject) => {
      Vue.http.put(`${path}/${id}`, params)
        .then((response) => {
          if (response.body.status === 0) {
            dispatch('openAlertBox', [
              'alertSuccess',
              successText,
            ], { root: true })
            resolve()
          } else if (response.body.status === -1) {
            dispatch('openAlertBox', [
              'alertError',
              response.body.msg,
            ], { root: true })
          } else if (response.body.status === -2) {
            dispatch('openAlertBox', [
              'alertValidationError',
              response.body.msg,
            ], { root: true })
          }
          dispatch('getItemDetails', [state.item[state.itemIdColumn]])
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            error.statusText,
          ], { root: true })
          reject(error)
        })
    })
  },
  deleteChild ({
    dispatch, state,
  }, [
    id,
    successText,
    errorText,
    path,
  ]) {
    Vue.http.delete(`${path}/${id}`)
      .then((response) => {
        if (response.body.status === 0) {
          dispatch('openAlertBox', [
            'alertSuccess',
            successText,
          ], { root: true })
        } else if (response.body.status === -1) {
          dispatch('openAlertBox', [
            'alertError',
            response.body.msg,
          ], { root: true })
        } else if (response.body.status === -2) {
          dispatch('openAlertBox', [
            'alertValidationError',
            response.body.msg,
          ], { root: true })
        }
        dispatch('getItemDetails', [state.item[state.itemIdColumn]])
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      })
  },
  storeChild ({
    dispatch, state,
  }, [
    params,
    successText,
    path,
  ]) {
    return new Promise((resolve, reject) => {
      Vue.http.post(path, params)
        .then((response) => {
          if (response.body.status === 0) {
            dispatch('openAlertBox', [
              'alertSuccess',
              successText,
            ], { root: true })
            resolve()
          } else if (response.body.status === -1) {
            dispatch('openAlertBox', [
              'alertError',
              response.body.msg,
            ], { root: true })
          } else if (response.body.status === -2) {
            dispatch('openAlertBox', [
              'alertValidationError',
              response.body.msg,
            ], { root: true })
          }
          dispatch('getItemDetails', [state.item[state.itemIdColumn]])
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            error.statusText,
          ], { root: true })
          reject(error)
        })
    })
  },
  getChild ({ commit, dispatch }, [
    id,
    path,
    childItemName,
  ]) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${path}/${id}`)
        .then((response) => {
          commit('setChild', [
            response.body,
            childItemName,
          ])
          resolve()
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            error.statusText,
          ], { root: true })
        })
    })
  },
  runItemsViewRefreshing ({ commit }) {
    commit('refreshTable', true)
    setTimeout(() => {
      commit('refreshTable', false)
    }, 2000)
  },
}

export default actions