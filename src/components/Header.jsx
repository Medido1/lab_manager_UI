import labIcon from '/microscope.png'

function Header(){
    return (
        <header 
            className="header p-4 flex ">
            <div className='flex items-center'>
              <img 
                src={labIcon} alt="lab Icon"
                className='h-10'
              />
            <h1 className='text-2xl font-bold'>My Lab Manager</h1>
            </div>
        </header>
    )
}

export default Header;