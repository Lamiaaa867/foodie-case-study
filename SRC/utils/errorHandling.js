export const asyncHandler = (API) => {
    return (req, res, next) => {
      API(req, res, next).catch((err) => {
        console.log(err)
        res.status(500).json({ messge: 'Fail' })
      })
    }
  }