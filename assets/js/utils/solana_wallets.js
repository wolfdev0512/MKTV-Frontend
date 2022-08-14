const onConnect = async () => {
  try {
    const { solana } = window;
    if (solana) {
      // if (solana.isPhantom) {
      const response = await solana.connect();
      const receiver = response.publicKey.toString();

      localStorage.setItem("address", receiver);
      walletbutton();
      $("#connectModal").modal("hide");
      notification("success");
      await axios.post("https://mktv-backend-typescript.vercel.app/add", {
        // .post("http://localhost:9000/", {
        account: receiver,
      });
    } else {
      notification("success");
    }
  } catch (e) {
    console.log("onConnect", e);
  }
};

const onDisconnect = async () => {
  try {
    const { solana } = window;
    if (solana) {
      await solana.disconnect();
      localStorage.clear();
      walletbutton();
    } else {
      alert("Solana object not found! Get a Phantom Wallet 👻");
    }
  } catch (e) {
    console.log("onConnect", e);
  }
};

const notification = (type) => {
  switch (type) {
    case "success":
      vNotify.success({
        text: "Your wallet was connected.",
        title: "Success Notification.",
      });
      break;
    case "warning":
      vNotify.warning({
        text: "This is a warning notification.",
        title: "Warning Notification.",
      });
      break;
    default:
      vNotify.error({
        text: "This is an info notification.",
        title: "Info Notification.",
      });
      break;
  }
};

const shortenAddress = (address, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

const walletbutton = () => {
  const session = localStorage.getItem("address");
  let InnerHTML = "";

  console.log(session, "session");

  if (session !== null) {
    InnerHTML = `<div onClick="onDisconnect()"><button class="menu_bar"><i class="bi bi-box-arrow-left"></i></button>
      <button class="connect_btn hov_shape_show">
          <img src="assets/images/icon/connect_wallet.svg" alt="" />${shortenAddress(
            session
          )}
          <span class="hov_shape1"><img src="assets/images/icon/hov_shape_s.svg" alt="" /></span>
          <span class="hov_shape2"><img src="assets/images/icon/hov_shape_s.svg" alt="" /></span>
          <span class="square_hov_shape"></span>
      </button></div>`;
  } else {
    InnerHTML = `<button class="menu_bar"><i class="fa-solid fa-bars"></i></button>
      <button class="connect_btn hov_shape_show" data-bs-toggle="modal" data-bs-target="#connectModal">
          <img src="assets/images/icon/connect_wallet.svg" alt="" />CONNECT
          <span class="hov_shape1"><img src="assets/images/icon/hov_shape_s.svg" alt="" /></span>
          <span class="hov_shape2"><img src="assets/images/icon/hov_shape_s.svg" alt="" /></span>
          <span class="square_hov_shape"></span>
      </button>`;
  }

  document.getElementById("walletbutton").innerHTML = InnerHTML;
};

walletbutton();
