export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments/?search[parent]=${id}&limit=*&fields=*,author(profile)`
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result.items}});

      } catch (e) {
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  sendComment: (text, id, type) => {
    return async (dispatch, getState, services) => {
      const token = localStorage.getItem('token');

      if(token){
        try{
          dispatch({type: "comments/add-start"});
          services.api.setHeader(services.config.tokenHeader, token);
          
          const res = await services.api.request({
            url: `/api/v1/comments/`, method: 'POST', body: JSON.stringify({
              "text": text,
              "parent": {
                "_id": id,
                "_type": type //article || comment
              }
            })
          });
          dispatch({type: "comments/add-success", payload: {data: res.data.result}});
        } catch(e) { 
          console.log(e)
        }}
      }
  },

  switchActiveField: (id) => {
    return {type: "comments/switch-active", payload: id}
  }
}
