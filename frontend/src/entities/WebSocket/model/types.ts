export type MessageData =
  | {
      type: 'userJoined'
      user: string
      userNameColor: string
      quantityUsers: number
    }
  | {
      type: 'userLeft'
      user: string
      quantityUsers: number
    }
  | {
      type: 'newMessage'
      user: string
      message: string
      userNameColor: string
      quantityUsers: number
    }
