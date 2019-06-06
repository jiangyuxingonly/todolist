window.addEventListener('load',function(){
    let tab=document.querySelectorAll('.tab > li');
    let prev=0;
    let type='all';
    //创建对象列表
    let content=document.querySelector('.content');
    let todoList=[
        {
            id:1,content:"达拉达拉达拉",ctime:'2019/6/04',checked:true
        },
        {
            id:2,content:"study English",ctime:'2019/6/05',status:true
        },
        {
            id:3,content:"黑凤凰要上映咯",ctime:'2019/6/06',status:false
        },
        {
            id:4,content:"端午假期",ctime:'2019/6/07',status:false
        }
    ];

    tab.forEach(function (ele,index) {
        ele.onclick=function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev=index;
            //获取状态，三种状态跳转
            type=this.getAttribute('type');
            render(optionType(type));
        }
    });
    tab[0].onclick();
    function optionType(type) {
        let arr=[];
        switch (type) {
            case 'all':arr=todoList;break;
            case 'done':arr=todoList.filter(function(ele){
                return ele.status;
            });break;
            case 'doing':arr=todoList.filter(ele=>!ele.status);break;
        }
        return arr;
    }
    // render(todoList);
    content.onclick=function (e) {
        let target=e.target;
        let id=target.parentNode.id;
        if(target.nodeName==='INPUT'){
            //找到该条记录id,finfIndex,filter(注意filter返回是数组)
            // let find=todoList.findIndex(ele=>ele.id==id);
            let ele=todoList.filter(ele=>ele.id==id)[0];
            //获取当前复选框状态
            console.log(ele);
            ele.status=target.checked;
            console.log(ele);
        }else if(target.nodeName==='SPAN'){
            //找到id
            let find=todoList.findIndex(ele=>ele.id==id);
            console.log(find);
            //数组删除元素
            todoList.splice(find,1);
        }
        render(optionType(type));  //type没有定义
    };
    // //渲染
    function render(arr){
        let html='';
        arr.forEach(function (elem,index) {
            if(elem.status){
                html+= `
                     <li id="${elem.id}">
                        <input type="checkbox" checked="checked"><p>${elem.content}</p><span><a href="">❌</a></span><time>${elem.ctime}</time>
                     </li>
                    `;
            }else{
                html+= `
                     <li id="${elem.id}">
                        <input type="checkbox"><p>${elem.content}</p> <span><a href="">❌</span></a><time>${elem.ctime}</time>
                     </li>
                    `;
            }
        });
        content.innerHTML=html;
    }
    let submitBtn=document.getElementsByName('submitBtn');
    let textContent=document.getElementsByName('textt');
    console.log(submitBtn[0]);
    submitBtn[0].onclick=function (e){
        //消除submit提交的默认
        e.preventDefault();
        let obj=createObj();
        todoList.push(obj);   //对象推进对象数组里
        render(optionType(type));
    }
    function createObj(){
        let content=textContent[0].value;
        let id=todoList[todoList.length-1].id+1;

        let ctime=new Date().toLocaleDateString();
        let status=false;
        return {id,content,ctime,status}
    }
})


