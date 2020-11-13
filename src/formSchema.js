import * as Yup from "yup";

export default Yup.object().shape({
    name: Yup.string().min(3, "Name must have at least 3 characters"),
})
