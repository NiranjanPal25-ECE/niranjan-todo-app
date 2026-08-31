exports.pageNotFound = (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "page not found"
    })
}