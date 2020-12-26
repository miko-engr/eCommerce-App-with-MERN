import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../constants/orderConstants'

// Creates an Order Action
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    // Destructure twice to get the userInfo
    const {
      userLogin: { userInfo },
    } = getState()

    // Pass token here
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // Send POST request of user by name/username/password
    const { data } = await axios.post(`/api/orders`, order, config)

    // Dispatch and send to Reducer
    dispatch({
      type: ORDER_CREATE_SUCCESS, // Successfully creates Order
      payload: data,
    })
  } catch (error) {
    // If fetching data was not succesful
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}