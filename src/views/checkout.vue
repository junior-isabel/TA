<template>
    <main>
        <div class="controller">
            <button>Adicionar TA</button>
        </div>
        <ul>
            <li>
                <div class="title">
                    <p>Alguma coisa</p>
                    <p>2h</p>
                </div>
                <div>
                    <p>tarefa</p>
                </div>
            </li>
        </ul>
    </main>
</template>

<style scoped>
main {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.controller {
    text-align: right;
    width: 100%;
}
.controller button {
    padding: .8rem 1rem;
    border-style: none;
    outline-style: none;
    border-radius: 8px;
    background: blueviolet;
    color: #fff;
    box-shadow: inset 0 0 5px 0 rgb(123, 125, 241);
    cursor: pointer;
}
ul {
    padding: 0;
    list-style: none;
    text-align: left;
}
ul li {
    background: #f1f1f1;
    padding: 1rem;
}
ul li .title {
    display: flex;
    justify-content: space-between;
    width: 90%;
}
li .title p {
    margin: 0;
}
</style>