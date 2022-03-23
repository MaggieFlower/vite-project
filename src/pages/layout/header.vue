<template>
    <article class="container-header">
        <div class="user-info-wrapper">
            <span class="login">登录/注册</span>
            <img class="avator"  src="../images/lufei.jpeg" alt="avator"/>
        </div>
    </article>
</template>
<style lang="less">
.container-header{
    height: 64px;
    padding: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: content-box;
    line-height: 1;
    background-color: rgba(0, 21, 41, .1);
    .user-info-wrapper{
        .login{
            margin-right: 8px;
        }
        .avator{
            width: 40px;
            height: 40px;
            border-radius: 20px;
        }
    }
}
</style>