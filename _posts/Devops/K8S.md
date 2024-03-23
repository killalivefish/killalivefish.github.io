- 官方文档：[https://kubernetes.io/zh-cn/docs/tasks/access-application-cluster/web-ui-dashboard/](https:/kubernetes.io/zh-cn/docs/tasks/access-application-cluster/web-ui-dashboard/)

## 部署

[https://yeasy.gitbook.io/docker_practice/setup/kubeadm#xiu-gai-kubelet.service](https:/yeasy.gitbook.io/docker_practice/setup/kubeadm#xiu-gai-kubelet.service)

## 部署问题

1046  systemctl status kubelet

1047  journalctl -xefu kubelet

1. $KUBELET_KUBECONFIG_ARGS $<span style="color:rgba(244,63,94,1)">KUBELET_CONFIG_ARGS </span>$KUBELET_KUBEADM_ARGS $<span style="color:rgba(244,63,94,1)">KUBELET_EXTRA_ARGS (code=exited, status=1/FAILURE)</span>

   ```console
   [root@localhost manifests]# systemctl status kubelet
   ● kubelet.service - kubelet: The Kubernetes Node Agent
   Loaded: loaded (/usr/lib/systemd/system/kubelet.service; enabled; vendor preset: disabled)
   Drop-In: /usr/lib/systemd/system/kubelet.service.d
   └─10-kubeadm.conf
   /etc/systemd/system/kubelet.service.d
   └─10-proxy-ipvs.conf
   Active: activating (auto-restart) (Result: exit-code) since Fri 2024-03-15 20:54:38 CST; 4s ago
   Docs:  https://kubernetes.io/docs/ 
   Process: 4955 ExecStart=/usr/bin/kubelet  KUBELET_KUBECONFIG_ARGS  KUBELETK
   ​
   UBECONFIGA
   ​
   RGSKUBELET_CONFIG_ARGS  KUBELET_KUBEADM_ARGS  KUBELETK
   ​
   UBEADMA
   ​
   RGSKUBELET_EXTRA_ARGS (code=exited, status=1/FAILURE)
   Process: 4952 ExecStartPre=/sbin/modprobe ip_vs_sh (code=exited, status=0/SUCCESS)
   Process: 4948 ExecStartPre=/sbin/modprobe ip_vs_wrr (code=exited, status=0/SUCCESS)
   Process: 4946 ExecStartPre=/sbin/modprobe ip_vs_rr (code=exited, status=0/SUCCESS)
   Process: 4943 ExecStartPre=/sbin/modprobe ip_vs (code=exited, status=0/SUCCESS)
   Main PID: 4955 (code=exited, status=1/FAILURE)
   
   ```

   处理：

   1. `sudo swapoff -a`
   2. `vim /etc/sysconfig/kubelet` 添加`KUBELET_EXTRA_ARGS="--fail-swap-on=false"`

2. <b><span style="color:rgba(244,63,94,1)">certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")</span></b>

```console
Mar 15 23:07:44 localhost.localdomain kubelet[4093]: W0315 11:07:44.520050    4093 reflector.go:535] vendor/k8s.io/client-go/informers/factory.go:150: failed to list *v1.Service: Get "https://192.168.1.151:6443/api/v1/services?limit=500&resourceVersion=0": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")
Mar 15 23:07:44 localhost.localdomain kubelet[4093]: E0315 11:07:44.520150    4093 reflector.go:147] vendor/k8s.io/client-go/informers/factory.go:150: Failed to watch *v1.Service: failed to list *v1.Service: Get "https://192.168.1.151:6443/api/v1/services?limit=500&resourceVersion=0": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")
Mar 15 23:07:48 localhost.localdomain kubelet[4093]: E0315 11:07:48.082107    4093 event.go:289] Unable to write event: '&v1.Event{TypeMeta:v1.TypeMeta{Kind:"", APIVersion:""}, ObjectMeta:v1.ObjectMeta{Name:"localhost.localdomain.17bcf890253b39ad", GenerateName:"", Namespace:"default", SelfLink:"", UID:"", ResourceVersion:"", Generation:0, CreationTimestamp:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), DeletionTimestamp:<nil>, DeletionGracePeriodSeconds:(*int64)(nil), Labels:map[string]string(nil), Annotations:map[string]string(nil), OwnerReferences:[]v1.OwnerReference(nil), Finalizers:[]string(nil), ManagedFields:[]v1.ManagedFieldsEntry(nil)}, InvolvedObject:v1.ObjectReference{Kind:"Node", Namespace:"", Name:"localhost.localdomain", UID:"localhost.localdomain", APIVersion:"", ResourceVersion:"", FieldPath:""}, Reason:"Starting", Message:"Starting kubelet.", Source:v1.EventSource{Component:"kubelet", Host:"localhost.localdomain"}, FirstTimestamp:time.Date(2024, time.March, 15, 11, 7, 36, 477563309, time.Local), LastTimestamp:time.Date(2024, time.March, 15, 11, 7, 36, 477563309, time.Local), Count:1, Type:"Normal", EventTime:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Series:(*v1.EventSeries)(nil), Action:"", Related:(*v1.ObjectReference)(nil), ReportingController:"kubelet", ReportingInstance:"localhost.localdomain"}': 'Post "https://192.168.1.151:6443/api/v1/namespaces/default/events": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")'(may retry after sleeping)
Mar 15 23:07:49 localhost.localdomain kubelet[4093]: E0315 11:07:49.126724    4093 controller.go:146] "Failed to ensure lease exists, will retry" err="Get \"https://192.168.1.151:6443/apis/coordination.k8s.io/v1/namespaces/kube-node-lease/leases/localhost.localdomain?timeout=10s\": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of \"crypto/rsa: verification error\" while trying to verify candidate authority certificate \"kubernetes\")" interval="7s"
Mar 15 23:07:49 localhost.localdomain kubelet[4093]: E0315 11:07:49.229282    4093 kubelet_node_status.go:92] "Unable to register node with API server" err="Post \"https://192.168.1.151:6443/api/v1/nodes\": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of \"crypto/rsa: verification error\" while trying to verify candidate authority certificate \"kubernetes\")" node="localhost.localdomain"
Mar 15 23:07:50 localhost.localdomain kubelet[4093]: E0315 11:07:50.946408    4093 certificate_manager.go:562] kubernetes.io/kube-apiserver-client-kubelet: Failed while requesting a signed certificate from the control plane: cannot create certificate signing request: Post "https://192.168.1.151:6443/apis/certificates.k8s.io/v1/certificatesigningrequests": tls: failed to verify certificate: x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "kubernetes")
```

处理：

```console
[root@localhost kubernetes]# mkdir -p $HOME/.kube
[root@localhost kubernetes]# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
[root@localhost kubernetes]# sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

结果：

```console
I0315 23:17:11.580630    4445 clusterinfo.go:84] creating the RBAC rules for exposing the cluster-info ConfigMap in the kube-public namespace
I0315 23:17:11.587252    4445 kubeletfinalize.go:90] [kubelet-finalize] Assuming that kubelet client certificate rotation is enabled: found "/var/lib/kubelet/pki/kubelet-client-current.pem"
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
I0315 23:17:11.588023    4445 kubeletfinalize.go:134] [kubelet-finalize] Restarting the kubelet to enable client certificate rotation
[addons] Applied essential addon: CoreDNS
I0315 23:17:11.954682    4445 request.go:629] Waited for 86.374315ms due to client-side throttling, not priority and fairness, request: POST:https://192.168.1.151:6443/apis/rbac.authorization.k8s.io/v1/namespaces/kube-system/rolebindings?timeout=10s
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.1.151:6443 --token 2frlvy.qxlm854tswpjm1vs \
        --discovery-token-ca-cert-hash sha256:11dc3cd6c67be161251719221f379b449ce8a376dae685bf55696112c69ef3bb
[root@localhost kubernetes]#

```

3. slave节点启动报错

   ```console
   [root@localhost kubelet.service.d]# kubeadm join 192.168.1.151:6443 --token 2frlvy.qxlm854tswpjm1vs \
   >         --discovery-token-ca-cert-hash sha256:11dc3cd6c67be161251719221f379b449ce8a376dae685bf55696112c69ef3bb \
   >         --cri-socket /run/cri-containerd/cri-containerd.sock
   W0315 23:34:27.840021    3741 initconfiguration.go:120] Usage of CRI endpoints without URL scheme is deprecated and can cause kubelet errors in the future. Automatically prepending scheme "unix" to the "criSocket" with value "/run/cri-containerd/cri-containerd.sock". Please update your configuration!
   [preflight] Running pre-flight checks
   error execution phase preflight: [preflight] Some fatal errors occurred:
           [ERROR FileContent--proc-sys-net-bridge-bridge-nf-call-iptables]: /proc/sys/net/bridge/bridge-nf-call-iptables does not exist
   [preflight] If you know what you are doing, you can make a check non-fatal with `--ignore-preflight-errors=...`
   To see the stack trace of this error execute with --v=5 or higher
   [root@localhost kubelet.service.d]# ls -l /proc/sys/net/bridge/bridge-nf-call-iptables
   ls: cannot access /proc/sys/net/bridge/bridge-nf-call-iptables: No such file or directory
   
   ```

   解决：

   ```console
   [root@localhost kubelet.service.d]# modprobe br_netfilter
   [root@localhost kubelet.service.d]# bridge
   ```

   再次执行启动命令：

   ```console
   [root@localhost kubelet.service.d]# kubeadm join 192.168.1.151:6443 --token 2frlvy.qxlm854tswpjm1vs         --discovery-token-ca-cert-hash sha256:11dc3cd6c67be161251719221f379b449ce8a376dae685bf55696112c69ef3bb         --cri-socket /run/cri-containerd/cri-containerd.sock
   W0315 23:37:11.133376    4111 initconfiguration.go:120] Usage of CRI endpoints without URL scheme is deprecated and can cause kubelet errors in the future. Automatically prepending scheme "unix" to the "criSocket" with value "/run/cri-containerd/cri-containerd.sock". Please update your configuration!
   [preflight] Running pre-flight checks
   [preflight] Reading configuration from the cluster...
   [preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
   [kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
   [kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
   [kubelet-start] Starting the kubelet
   [kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...
   
   This node has joined the cluster:
   * Certificate signing request was sent to apiserver and a response was received.
   * The Kubelet was informed of the new secure connection details.
   
   Run 'kubectl get nodes' on the control-plane to see this node join the cluster.
   
   [root@localhost kubelet.service.d]#
   
   ```

4. slave节点报错

   ```system-verilog
   
   W0316 23:52:09.706557    3009 initconfiguration.go:120] Usage of CRI endpoints without URL scheme is deprecated and can cause kubelet errors in the future. Automatically prepending scheme "unix" to the "criSocket" with value "/run/cri-containerd/cri-containerd.sock". Please update your configuration!
   [preflight] Running pre-flight checks
           [WARNING Swap]: swap is enabled; production deployments should disable swap unless testing the NodeSwap feature gate of the kubelet
   ```

5. slave节点报错：<b><span style="color:rgba(244,63,94,1)">error execution phase preflight: couldn't validate the identity of the API Server: could not find a JWS signature in the cluster-info ConfigMap for token ID "2frlvy"</span></b>

   ```console
   [root@localhost ~]#  kubeadm join 192.168.1.151:6443 --token 2frlvy.qxlm854tswpjm1vs         --discovery-token-ca-cert-hash sha256:11dc3cd6c67be161251719221f379b449ce8a376dae685bf55696112c69ef3bb         --cri-socket /run/cri-containerd/cri-containerd.sock
   W0316 23:54:25.603254    3067 initconfiguration.go:120] Usage of CRI endpoints without URL scheme is deprecated and can cause kubelet errors in the future. Automatically prepending scheme "unix" to the "criSocket" with value "/run/cri-containerd/cri-containerd.sock". Please update your configuration!
   [preflight] Running pre-flight checks
   error execution phase preflight: couldn't validate the identity of the API Server: could not find a JWS signature in the cluster-info ConfigMap for token ID "2frlvy"
   To see the stack trace of this error execute with --v=5 or higher
   ```

6. 主节点node报错<b><span style="color:rgba(244,63,94,1)">inNotReady message:Network plugin returns error: cni plugin not initialized</span></b>
7. 
8. sss
9. ````
   kubeadm join 192.168.1.151:6443 \
       --token cz81zt.orsy9gm9v649e5lf \
       --discovery-token-ca-cert-hash sha256:5edb316fd0d8ea2792cba15cdf1c899a366f147aa03cba52d4e5c5884ad836fe \
       --cri-socket /run/cri-containerd/cri-containerd.sock
   ````

````
kubeadm join 192.168.1.151:6443 --token 2frlvy.qxlm854tswpjm1vs \
        --discovery-token-ca-cert-hash sha256:11dc3cd6c67be161251719221f379b449ce8a376dae685bf55696112c69ef3bb \
        --cri-socket /run/cri-containerd/cri-containerd.sock
````

## 命令

- 生成token `kubeadm token generate`
- 查看服务 `CONTAINER_RUNTIME_ENDPOINT=/run/cri-containerd/cri-containerd.sock crictl ps -a`
- 查找所有namespce `kubectl get namespaces`
- 查找某个namespace下pod `kubectl get pods --namespace=kubernetes-dashboard`
- 查看pod的情况 `kubectl describe pod kubernetes-dashboard-79cf5b89bb-bcq8q -n kubernetes-dashboard`
- 查看所有的服务 `kubectl get all -A`
- 